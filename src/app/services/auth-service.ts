import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ReplaySubject, tap } from 'rxjs';
import { LoggedInUserInfoDto } from '../models/account/logged-in-user-info-dto';
import { LoginDto } from '../models/account/login-dto';
import { RegisterUserTenantDto } from '../models/account/register-user-tenant-dto';

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
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  loadUserRoles() {
    const url = this.baseUrl + '/current-user-roles';
    this.httpClient.get<string[]>(url).subscribe({
      next: (roles) => {
        this.rolesSubject.next(roles);
      },
      error: () => {
        this.rolesSubject.next([]);
      }
    });
  }

  hasRole(role: string): boolean {
    return this.rolesSubject.getValue().includes(role);
  }

  checkLoginStatus() {
    this.loadUserRoles();
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
    return this.httpClient.get<LoggedInUserInfoDto>(url).pipe(tap((user) => {
      if(user) {
        this.isLoggedInSubject.next(true);
      }
    }));
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
