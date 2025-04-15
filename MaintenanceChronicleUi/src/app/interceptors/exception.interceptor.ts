import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const exceptionInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);


  return next(req).pipe(
    // catchError((error: HttpErrorResponse) => {
    //   // if (error.status === 403) {
    //   //   // Navigate to the unauthorized page
    //   //   router.navigate(['/forbidden']);
    //   // }
    //   // if (error.status === 401) {
    //   //   console.log("redirecting to unauthorized page")
    //   //   // Navigate to the unauthorized page
    //   //   router.navigate(['/unauthorized']);
    //   // }
    //   // if (error.status >= 500) {
    //   //   // Navigate to the unauthorized page
    //   //   router.navigate(['/server-error']);
    //   // }
    //   // // Optionally, add more error handling here
    //   // return throwError(() => error);
    // })
  );
};
