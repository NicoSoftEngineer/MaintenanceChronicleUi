import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-email-confirm-page',
  imports: [],
  templateUrl: './email-confirm-page.component.html',
  styleUrl: './email-confirm-page.component.scss',
})
export class EmailConfirmPageComponent {
  protected readonly authService = inject(AuthService);
  protected readonly route = inject(ActivatedRoute);

  constructor() {
    const userEmail = this.route.snapshot.paramMap.get('email')!;
    const confirmToken = this.route.snapshot.paramMap.get('confirmToken')!;

    this.authService
      .validateEmailConfirmation(userEmail, confirmToken)
      .subscribe({
        next: async () => {
          console.log('Email confirmed');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
