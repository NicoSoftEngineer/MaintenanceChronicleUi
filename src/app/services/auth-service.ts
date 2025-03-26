import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  lastValueFrom,
  Observable,
  ReplaySubject,
  tap,
} from 'rxjs';
import { LoggedInUserInfoDto } from '../models/account/logged-in-user-info-dto';
import { LoginDto } from '../models/account/login-dto';
import { RegisterUserTenantDto } from '../models/account/register-user-tenant-dto';
import { UserPasswordDto } from '../models/account/user-password-dto';
import { UserTokenList } from '../models/account/user-token-list';
import { TokenHelperService } from '../utils/token-helper.service';
import { CookieHelperService } from '../utils/cookie-helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
    this.checkLoginStatus();
  }
  protected tokenService = inject(TokenHelperService);
  protected cookieService = inject(CookieHelperService);
  protected readonly baseUrl = '/api/v1/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();
  private usersSubject = new BehaviorSubject<UserTokenList[]>([]);
  users$ = this.usersSubject.asObservable();

  async switchUser(user: UserTokenList): Promise<void> {
    this.cookieService.setCookie('ActiveToken', user.tokenName, 14);
    await this.loadPossibleUsers();
    await this.loadUserRoles();
  }

  hasRole(role: string): boolean {
    let roles = this.rolesSubject.getValue();
    if(!roles) {return false;}
    return roles.includes(role);
  }

  async checkLoginStatus(): Promise<void> {
    await this.loadPossibleUsers();
    await this.loadUserRoles();
    const user = this.tokenService.getActiveUser();
    if (user) {
      this.isLoggedInSubject.next(true);
    }
  }
  async loadPossibleUsers(): Promise<void> {
    try {
      const users = this.tokenService.getPossibleUsers();
      this.usersSubject.next(users);
    } catch (error) {
      this.usersSubject.next([]);
    }
  }
  async loadUserRoles(): Promise<void> {
    try {
      const roles = this.tokenService.getActiveUserRoles();
      this.rolesSubject.next(roles);
    } catch (error) {
      this.rolesSubject.next([]);
    }
  }
  userinfo(): Observable<LoggedInUserInfoDto> {
    const url = this.baseUrl + '/current-user-info';
    return this.httpClient.get<LoggedInUserInfoDto>(url).pipe(
      tap((user) => {
        if (user) {
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    const url = this.baseUrl + '/refresh-token';
    return this.httpClient.post<any>(url, null).pipe(
      tap((response) => {
        const token = response.token;
        const name = response.name;
        localStorage.setItem(name, token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  login(data: LoginDto): Observable<any> {
    const url = this.baseUrl + '/login';
    return this.httpClient.post<any>(url, data).pipe(
      tap((response) => {
        const token = response.token;
        const name = response.name;
        localStorage.setItem(name, token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): Observable<undefined> {
    const url = this.baseUrl + '/logout';
    return this.httpClient.get<undefined>(url).pipe(
      tap(() => {
        this.isLoggedInSubject.next(false);
      })
    );
  }

  resetPassword(data: UserPasswordDto): Observable<undefined> {
    const url = this.baseUrl + '/reset-password';
    return this.httpClient.post<undefined>(url, data).pipe();
  }

  register(data: RegisterUserTenantDto): Observable<undefined> {
    const url = this.baseUrl + '/register-user-tenant';
    return this.httpClient.post<undefined>(url, data).pipe();
  }

  emailConfirmation(email: string): Observable<undefined> {
    const url = this.baseUrl + '/send-email-confirm-email';
    return this.httpClient
      .post<undefined>(url, null, { params: { email: email } })
      .pipe();
  }

  validateEmailConfirmation(
    email: string,
    confirmToken: string
  ): Observable<undefined> {
    const url = this.baseUrl + '/validate-token';
    return this.httpClient
      .post<undefined>(url, null, {
        params: { email: email, token: confirmToken },
      })
      .pipe();
  }
}
