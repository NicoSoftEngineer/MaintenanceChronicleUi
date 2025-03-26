import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { UserTokenList } from '../../../models/account/user-token-list';

@Component({
  selector: 'app-choose-account',
  imports: [RouterLink],
  templateUrl: './choose-account.component.html',
  styleUrl: './choose-account.component.scss'
})
export class ChooseAccountComponent {
protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  isLoggedIn = false;
  users: UserTokenList[] = [];

  async ngOnInit() {
    await this.authService.checkLoginStatus();
    // Subscribe to the isLoggedIn$ observable to update UI reactively
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.authService.users$.subscribe((res) => {
      this.users = res;
      if(res.length == 0) {
        this.router.navigate(['/login']);
      }
      if(res.length === 1) {
        this.authService.switchUser(res[0]);
      }
    });
  }
  async switchUser(user: UserTokenList) {
    this.authService.switchUser(user);
    await this.authService.checkLoginStatus();
    this.router.navigate(['/']);
  }
}
