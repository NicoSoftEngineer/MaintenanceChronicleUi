import { Component, computed, inject, OnInit } from '@angular/core';
import { AlertComponent } from '../../../components/alert/alert.component';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { AuthService } from '../../../services/auth-service';
import { getErrorMessage } from '../../../utils/form-control-error-helper.service';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    AlertComponent,
    FormInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;

  protected formular = this.fb.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  onSubmit() {
    if (this.formular.valid) {
      this.authService
        .forgotPassword(this.formular.controls.email.value)
        .subscribe(
          () => {
            this.alertStateService.openAlert(
              'Jestli byly správně zadán email, tak Vám byl poslán email!',
              'success'
            );
          },
          (error) => {
            if (error.status != 400) {
              this.alertStateService.openAlert(
                'Nastal problém během odesílání emailu!',
                'error'
              );
            } else {
              this.alertStateService.openAlert(
                'Jestli byly správně zadán email, tak Vám byl poslán email!',
                'success'
              );
            }
          }
        );
    }
  }
}
