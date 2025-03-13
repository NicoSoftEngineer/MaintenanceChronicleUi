import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../validators/confirm-password-validator';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { applyBackendErrors, getErrorMessage } from '../../../utils/form-control-error-helper.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../components/alert/alert.component';
import { SearchSelectComponent } from "../../../components/search-select/search-select.component";

@Component({
  selector: 'app-create-password-page',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
  ],
  templateUrl: './create-password-page.component.html',
  styleUrl: './create-password-page.component.scss',
})
export class CreatePasswordPageComponent {
  protected readonly authService = inject(AuthService);
  protected readonly route = inject(ActivatedRoute);
  protected readonly getErrorMessage = getErrorMessage;
  protected readonly confirmPasswordValidator = confirmPasswordValidator;
  protected userEmail = this.route.snapshot.paramMap.get('email')!;
  protected confirmToken = this.route.snapshot.paramMap.get('confirmToken')!;
  protected passwordToken = this.route.snapshot.paramMap.get('passwordToken')!;
  protected readonly fb = inject(FormBuilder);
  protected readonly applyBackendErrors = applyBackendErrors;
  protected successfull = false;

  protected form = this.fb.group({
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordConfirm: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.confirmPasswordValidator],
    }),
  });

  constructor() {
    this.authService
      .validateEmailConfirmation(this.userEmail, this.confirmToken)
      .subscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService
      .resetPassword({
        email: this.userEmail,
        newPassword: this.form.get('password')!.value,
        resetToken: this.passwordToken,
      })
      .subscribe({
        next: () => {
          this.successfull = true;
        },
        error: (error) => {
          this.applyBackendErrors(this.form, error.error.errors);
        }
      }
      );
  }
}
