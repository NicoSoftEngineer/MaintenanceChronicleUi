import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.hasRole('Admin')) {
      return true;
    }
    this.router.navigate(['/access-denied']); // Redirect if unauthorized
    return false;
  }
}
