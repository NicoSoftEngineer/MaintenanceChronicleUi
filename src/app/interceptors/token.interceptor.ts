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

  if (req.url.includes('/login')) {
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
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/Auth/Refresh')) {
        return authService.refreshToken().pipe(
          switchMap((newAccessToken) => {
            if (!newAccessToken) {
              return throwError(() => error);
            }
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(clonedRequest);
          }),
          catchError((err) => {
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  )
};
