import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { CookieHelperService } from '../utils/cookie-helper.service';
import { TokenHelperService } from '../utils/token-helper.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieHelperService);
  const tokenService = inject(TokenHelperService);

  if (req.url.includes('/login') || req.url.includes('/register') || req.url.includes('/send')|| req.url.includes('/validate')) {
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
  console.log("Original equest with token header", req.headers.get('Authorization'));
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap((newAccessToken) => {
            console.log("Got access token from refresh token", newAccessToken);
            if (!newAccessToken) {
              return throwError(() => error);
            }
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken.token}`,
              }
            });
            console.log("Cloned request with token header", clonedRequest.headers.get('Authorization'));

            return next(clonedRequest);
          }),
          catchError((err) => {
            console.log("Error while refreshing token", err);
            return throwError(() => err);
          })
        );
      }
      console.log("Error while sending request", error);
      return throwError(() => error);
    })
  )
};
