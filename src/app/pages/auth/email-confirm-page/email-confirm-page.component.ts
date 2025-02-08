import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth-service.service';
import { ActivatedRoute } from '@angular/router';

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
