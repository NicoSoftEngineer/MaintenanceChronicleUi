import { jwtDecode } from 'jwt-decode';
import { inject, Injectable } from '@angular/core';
import { UserTokenList } from '../models/account/user-token-list';
import { CookieHelperService } from './cookie-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TokenHelperService {
  protected cookieService = inject(CookieHelperService);


  getPossibleUsers(): UserTokenList[] {
    const activeTokenName = this.cookieService.getCookie('ActiveToken');
    const tokens = localStorage;
    const possibleUsers: UserTokenList[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const key = tokens.key(i);
      if (key && key.startsWith('Auth')) {
        const token = tokens.getItem(key);
        const decoded = jwtDecode<any>(token!);
        const user: UserTokenList = {
          email: decoded.email,
          name: decoded.name,
          tokenName: key,
          isActive: key === activeTokenName,
        };
        possibleUsers.push(user);
      }
    }
    possibleUsers.sort((a, b) => {
      if (a.isActive === b.isActive) return 0;
      return a.isActive ? -1 : 1;
    });
    return possibleUsers;
  }

}
