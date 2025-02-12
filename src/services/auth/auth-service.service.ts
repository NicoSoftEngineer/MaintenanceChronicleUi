import { EmailConfirmTokenForUserDto } from './../../app/models/email-confirm-token-for-user-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ReplaySubject } from 'rxjs';
import { LoginDto } from '../../app/models/login-dto';
import { RegisterUserTenantDto } from '../../app/models/register-user-tenant-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }
  protected readonly baseUrl = '/api/v1/auth';
  private isLoggedInSubject = new ReplaySubject<boolean>(1);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(data: LoginDto): Observable<undefined> {
    const url = this.baseUrl + '/login';
    return this.httpClient.post<undefined>(url, data).pipe(

    );
  }

  register(data: RegisterUserTenantDto): Observable<undefined> {
    const url = this.baseUrl + '/register-user-tenant';
    return this.httpClient.post<undefined>(url, data).pipe(
    );
  }

  emailConfirmation(email: string): Observable<undefined> {
    const url = this.baseUrl + '/send-email-confirm-email';
    return this.httpClient.post<undefined>(url, null,{params: {email : email}} ).pipe(
    );
  }

  validateEmailConfirmation(email: string, confirmToken: string): Observable<undefined> {
    const url = this.baseUrl + '/validate-token';
    return this.httpClient.post<undefined>(url, null, {params: {email: email, token: confirmToken}}).pipe(
    );
  }
}
