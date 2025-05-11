import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { UserTokenList } from '../../../models/account/user-token-list';

@Component({
  selector: 'app-choose-account',
  imports: [RouterLink],
  templateUrl: './choose-account.component.html',
  styleUrl: './choose-account.component.scss',
})
export class ChooseAccountComponent {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  isLoggedIn = false;
  users: UserTokenList[] = [];
  user: UserTokenList | null = null;

  async ngOnInit() {
    await this.authService.checkLoginStatus();
    // Subscribe to the isLoggedIn$ observable to update UI reactively
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.authService.users$.subscribe((res) => {
      this.users = res;
    });
    this.authService.user$.subscribe((res) => {
      this.user = res;
    });
    console.log(this.users.length);
    if(!this.user && this.users.length == 1) {
      console.log('Swithing users.');
      this.switchUser(this.users[0]);
    }else if(this.users.length == 0) {
      console.log('No users found, redirecting to login page.', this.users.length);
      this.router.navigate(['/login']);
    }
  }

  async switchUser(user: UserTokenList) {
    this.authService.switchUser(user);
    await this.authService.checkLoginStatus();

    this.router.navigate(['/']);
  }
}
