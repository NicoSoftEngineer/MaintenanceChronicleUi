import { EmailConfirmTokenForUserDto } from './../../app/models/email-confirm-token-for-user-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ReplaySubject, tap } from 'rxjs';
import { LoginDto } from '../../app/models/login-dto';
import { RegisterUserTenantDto } from '../../app/models/register-user-tenant-dto';
import { LoggedInUserInfoDto } from '../../app/models/logged-in-user-info-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
    this.checkLoginStatus();
  }
  protected readonly baseUrl = '/api/v1/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  checkLoginStatus() {
    this.userinfo().subscribe({
      next: () => {
        this.isLoggedInSubject.next(true);
      },
      error: () => {
        this.isLoggedInSubject.next(false);
      }
    });
  }

  userinfo(): Observable<LoggedInUserInfoDto> {
    const url = this.baseUrl + '/current-user-info';
    return this.httpClient.get<LoggedInUserInfoDto>(url);
  }

  login(data: LoginDto): Observable<undefined> {
    const url = this.baseUrl + '/login';
    return this.httpClient.post<undefined>(url, data).pipe(tap(() => this.isLoggedInSubject.next(true)));
  }

  logout(): Observable<undefined> {
    const url = this.baseUrl + '/logout';
    return this.httpClient.get<undefined>(url).pipe(tap(() => this.isLoggedInSubject.next(false)));
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
