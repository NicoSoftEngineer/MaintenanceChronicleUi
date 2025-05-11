import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getErrorMessage } from '../../../utils/form-control-error-helper.service';
import { FormInputComponent } from '../../../components/form-input/form-input.component';

@Component({
  selector: 'app-email-confirm-page',
  imports: [
    AlertComponent,
    FormInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './email-confirm-page.component.html',
  styleUrl: './email-confirm-page.component.scss',
})
export class EmailConfirmPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;

  sucessful: boolean | null = null;

  protected formular = this.fb.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor() {
    const userEmail = this.route.snapshot.paramMap.get('email')!;
    const confirmToken = this.route.snapshot.paramMap.get('confirmToken')!;

    this.authService
      .validateEmailConfirmation(userEmail, confirmToken)
      .subscribe({
        next: async () => {
          this.router.navigate(['/login'], {
            queryParams: {
              email: userEmail,
              message: 'Email úspěšně potvrzen!',
              messageType: 'success',
            },
          });
        },
        error: (error) => {
          this.sucessful = false;
          this.alertStateService.openAlert(
            'Omlouváme se, ale Váš link je neplatný. Zkuste to prosím znovu!',
            'error'
          );
        },
      });
  }

  onSubmit(): void {
    this.alertStateService.closeAlert();

    if (this.formular.valid) {
      this.sendEmailVerification(this.formular.get('email')?.value!);
    } else {
      this.formular.markAllAsTouched();
    }
    setTimeout(() => {
      this.alertStateService.openAlert(
        'Pokud jste správně napsali Váš email, oveřovací email byl znovu odselán!',
        'success'
      );
    }, 100);
  }

  private sendEmailVerification(email: string) {
    this.authService.emailConfirmation(email).subscribe();
  }
}
