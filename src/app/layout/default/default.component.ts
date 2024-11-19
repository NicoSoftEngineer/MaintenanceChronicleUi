import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  protected readonly authService = inject(AuthService);
  protected user$ = this.authService.isLoggedIn$;
}
