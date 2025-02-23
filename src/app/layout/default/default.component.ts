import { AuthService } from '../../../services/auth-service';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-default',
    standalone: true,
    imports: [AsyncPipe, RouterOutlet, RouterLink],
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss'
})
export class DefaultComponent {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected user$ = this.authService.userinfo();
  isLoggedIn = false;

  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to update UI reactively
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.reinitializeDropdown();
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: async () => {
        await this.router.navigate(['/login']);
      }
    })
  }

  reinitializeDropdown() {
    setTimeout(() => {
      initFlowbite();
    }, 100); // Delay to ensure the DOM updates
  }
}
