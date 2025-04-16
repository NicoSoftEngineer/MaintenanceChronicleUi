import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { CookieHelperService } from '../utils/cookie-helper.service';
import { TokenHelperService } from '../utils/token-helper.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieHelperService);
  const tokenService = inject(TokenHelperService);
  const router = inject(Router);

  if (
    req.url.includes('/login') ||
    req.url.includes('/register') ||
    req.url.includes('/send') ||
    req.url.includes('/validate')
  ) {
    return next(req);
  }

  const activeToken = cookieService.getCookie('ActiveToken');

  if (!activeToken) {
    return next(req);
  }

  const token = localStorage.getItem(activeToken!);

  if (!token) {
    return next(req);
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(
    'Original equest with token header',
    req.headers.get('Authorization')
  );
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap((newAccessToken) => {
            console.log('Got access token from refresh token', newAccessToken);
            if (!newAccessToken) {
              return throwError(() => error);
            }
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken.token}`,
              },
            });

            return next(clonedRequest);
          }),
          catchError((err) => {
            if (error.status === 403) {
              // Navigate to the unauthorized page
              router.navigate(['/forbidden']);
            }
            if (error.status === 401) {
              console.log('redirecting to unauthorized page');
              // Navigate to the unauthorized page
              router.navigate(['/unauthorized']);
            }
            if (error.status >= 500) {
              // Navigate to the unauthorized page
              router.navigate(['/server-error']);
            }
            // Optionally, add more error handling here
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
