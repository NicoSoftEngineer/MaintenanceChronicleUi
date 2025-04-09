import { jwtDecode } from 'jwt-decode';
import { inject, Injectable } from '@angular/core';
import { UserTokenList } from '../models/account/user-token-list';
import { CookieHelperService } from './cookie-helper.service';

@Injectable({
  providedIn: 'root',
})
export class TokenHelperService {
  protected cookieService = inject(CookieHelperService);

  getPossibleOtherUsers(): UserTokenList[] {
    const activeTokenName = this.cookieService.getCookie('ActiveToken');
    const tokens = localStorage;
    const possibleUsers: UserTokenList[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const key = tokens.key(i);
      if (key && key.startsWith('Auth')) {
        const token = tokens.getItem(key);
        const decoded = jwtDecode<any>(token!);
        if(key != activeTokenName){
          const user: UserTokenList = {
            email: decoded.email,
            name: decoded.name,
            tokenName: key,
          };
          possibleUsers.push(user);
        }
      }
    }

    return possibleUsers;
  }

  getActiveUser(): UserTokenList | null {
    const activeTokenName = this.cookieService.getCookie('ActiveToken');
    if (!activeTokenName) return null;
    const tokens = localStorage;
    const token = tokens.getItem(activeTokenName!);
    if (!token) return null;
    const decoded = jwtDecode<any>(token!);
    const user: UserTokenList = {
      email: decoded.email,
      name: decoded.name,
      tokenName: activeTokenName!,
    };
    return user;
  }

  getActiveUserRoles(): string[] {
    const activeTokenName = this.cookieService.getCookie('ActiveToken');
    if (!activeTokenName) return [];
    const tokens = localStorage;
    const token = tokens.getItem(activeTokenName!);
    if (!token) return [];
    const decoded = jwtDecode<any>(token!);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
}
