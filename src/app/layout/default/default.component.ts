import { UserTokenList } from './../../models/account/user-token-list';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Dropdown, initFlowbite, Collapse, InstanceOptions } from 'flowbite';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent implements OnInit{
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  isLoggedIn = false;
  users: UserTokenList[] = [];
  private dropdownInstance: Dropdown | null = null;

  // set the target element that will be collapsed or expanded (eg. navbar menu)
  $targetEl = document.getElementById('user-dropdown');

  // optionally set a trigger element (eg. a button, hamburger icon)
  $triggerEl = document.getElementById('user-menu-button');

  // optional options with default values and callback functions
  options = {
  };

  instanceOptions : InstanceOptions = {
    id: 'user-dropdown',
    override: true,
  };

  async ngOnInit() {
    await this.authService.checkLoginStatus();
    // Subscribe to the isLoggedIn$ observable to update UI reactively
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.reinitializeDropdown();
    });
    this.authService.users$.subscribe((res) => {
      this.users = res;
      this.reinitializeDropdown();
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: async () => {
        await this.router.navigate(['/login']);
      },
    });
  }

  switchUser(user: UserTokenList) {
    this.$targetEl = document.getElementById('user-dropdown');
    this.$triggerEl = document.getElementById('user-menu-button');
    const collapse = new Collapse(this.$targetEl, this.$triggerEl, this.options, this.instanceOptions);
    this.authService.switchUser(user);
    collapse.collapse();
    this.router.navigate(['/']);
  }

  reinitializeDropdown() {
    setTimeout(() => {
      initFlowbite();
    }, 100); // Delay to ensure the DOM updates
  }
}
