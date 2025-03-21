import { AlertStateService } from '../../../components/alert/alert-state.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import {
  applyBackendErrors,
  getErrorMessage,
} from '../../../utils/form-control-error-helper.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { confirmPasswordValidator } from '../../../validators/confirm-password-validator';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
    AlertComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  @ViewChild(FormInputComponent) formInputComponent!: FormInputComponent;
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;
  protected readonly confirmPasswordValidator = confirmPasswordValidator;
  protected readonly applyBackendErrors = applyBackendErrors;
  protected showEmailAlert = false;

  protected userFormular = this.fb.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordConfirm: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.confirmPasswordValidator],
    }),
    tenantName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    this.userFormular.markAllAsTouched();
    if (this.userFormular.invalid) {
      console.log(this.userFormular.controls.passwordConfirm);
      return;
    }

    const dataRaw = this.userFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));

    this.authService.register(data).subscribe({
      next: () => {
        this.sendEmailVerification(data.email);
      },
      error: (errors) => {
        this.applyBackendErrors(this.userFormular, errors.error.errors);
      },
    });
  }

  private sendEmailVerification(email: string) {
    this.authService.emailConfirmation(email).subscribe({
      next: () => {
        this.alertStateService.openAlert('Ověřovací email byl odeslán!', 'success');
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
