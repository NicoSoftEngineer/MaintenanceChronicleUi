import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { AuthService } from '../../../services/auth-service';
import { getErrorMessage } from '../../../utils/form-control-error-helper.service';
import { confirmPasswordValidator } from '../../../validators/confirm-password-validator';

@Component({
  selector: 'app-reset-password-page',
  imports: [
    AlertComponent,
    FormInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly route = inject(ActivatedRoute);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;
  protected readonly confirmPasswordValidator = confirmPasswordValidator;
  protected userEmail = this.route.snapshot.paramMap.get('email')!;
  protected passwordToken = this.route.snapshot.paramMap.get('passwordToken')!;

  protected formular = this.fb.group({
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordConfirm: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.confirmPasswordValidator],
    }),
  });

  onSubmit() {
    if (this.formular.valid) {
      this.authService
        .resetPassword({
          email: this.userEmail,
          newPassword: this.formular.get('password')!.value,
          resetToken: this.passwordToken,
        })
        .subscribe({
          next: () => {
            this.alertStateService.openAlert(
              'Heslo bylo změněno, podračujte na přihlášení!',
              'success'
            );
          },
          error: (error) => {
              this.alertStateService.openAlert(
                error.errors.message,
                'error'
              );
          },
        });
    }
  }
}
