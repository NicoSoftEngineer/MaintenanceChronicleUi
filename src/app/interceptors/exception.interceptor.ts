import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const exceptionInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Navigate to the unauthorized page
        router.navigate(['/forbidden']);
      }
      // Optionally, add more error handling here
      return throwError(() => error);
    })
  );
};
