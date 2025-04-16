import { UserTokenList } from './../../models/account/user-token-list';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  Dropdown,
  initFlowbite,
  Collapse,
  InstanceOptions,
  CollapseOptions,
} from 'flowbite';
import { AuthService } from '../../services/auth-service';
import { CookieHelperService } from '../../utils/cookie-helper.service';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  protected cookieService = inject(CookieHelperService);
  protected readonly router = inject(Router);
  isLoggedIn = false;
  users: UserTokenList[] = [];
  activeUser: UserTokenList | null = null;
  private dropdownInstance: Dropdown | null = null;

  showAccountMenu = false;
  showAccountsList = true;

  toggleAccountMenu() {
    this.showAccountMenu = !this.showAccountMenu;
  }

  toggleAccountsList() {
    this.showAccountsList = !this.showAccountsList;
  }

  // optional options with default values and callback functions
  options = {};

  instanceOptions: InstanceOptions = {
    id: 'user-dropdown',
    override: false,
  };
  collapseOptions: CollapseOptions = {};

  async ngOnInit() {
    (async () => {
      await this.authService.checkLoginStatus();
      // Subscribe to the isLoggedIn$ observable to update UI reactively
      this.getuserInfo();
    })();
  }

  logout() {
    let $targetEl = document.getElementById('user-dropdown');
    let $triggerEl = document.getElementById('user-menu-button');
    const collapse = new Collapse(
      $targetEl,
      $triggerEl,
      this.options,
      this.instanceOptions
    );

    this.authService.logout().subscribe({
      next: async () => {
        const activeToken = this.cookieService.getCookie('ActiveToken');
        if (activeToken) {
          console.log('Removing active token');
          localStorage.removeItem(activeToken);
          this.cookieService.setCookie('ActiveToken', '', -1);
        }
      },
    });
    setTimeout(async () => {
      collapse.collapse();
      this.reinitializeDropdown();
      this.router.navigate(['/choose-account']);

    }, 50); // Delay to ensure the DOM updates
  }

  async switchUser(user: UserTokenList) {
    let $targetEl = document.getElementById('user-dropdown');
    let $triggerEl = document.getElementById('user-menu-button');
    const collapse = new Collapse(
      $targetEl,
      $triggerEl,
      this.options,
      this.instanceOptions
    );

    await this.authService.switchUser(user);

    setTimeout(async () => {
      collapse.collapse();
      this.reinitializeDropdown();
      await this.authService.checkLoginStatus();
      this.router.navigate(['/']);

    }, 50); // Delay to ensure the DOM updates
  }

  manageAccounts() {
    let $targetEl = document.getElementById('user-dropdown');
    let $triggerEl = document.getElementById('user-menu-button');
    const collapse = new Collapse(
      $targetEl,
      $triggerEl,
      this.options,
      this.instanceOptions
    );
    setTimeout(() => {
      collapse.collapse();
      this.router.navigate(['/choose-account']);
    }, 100); // Delay to ensure the DOM updates
  }

  addAccount() {
    let $targetEl = document.getElementById('user-dropdown');
    let $triggerEl = document.getElementById('user-menu-button');
    const collapse = new Collapse(
      $targetEl,
      $triggerEl,
      this.options,
      this.instanceOptions
    );
    setTimeout(() => {
      collapse.collapse();
      this.router.navigate(['/login']);
    }, 100); // Delay to ensure the DOM updates
  }

  toggleDropdown() {
    let $targetEl = document.getElementById('user-dropdown');
    let $triggerEl = document.getElementById('user-menu-button');
    const collapse = new Collapse(
      $targetEl,
      $triggerEl,
      this.options,
      this.instanceOptions
    );
    setTimeout(() => {
      collapse.toggle();
      this.reinitializeDropdown();
    }, 10); // Delay to ensure the DOM updates
  }

  reinitializeDropdown() {
    setTimeout(() => {
      initFlowbite();
    }, 100); // Delay to ensure the DOM updates
  }

  getuserInfo() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.authService.users$.subscribe((res) => {
      this.users = res;
    });
    this.authService.user$.subscribe((res) => {
      this.activeUser = res;
    });
  }
}
