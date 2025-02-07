import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../../../validators/confirm-password-validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected userFormular = this.fb.group(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      firstName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      lastName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      passwordConfirm: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      tenantName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: confirmPasswordValidator,
    }
  );

  onSubmit(): void {
    const dataRaw = this.userFormular.getRawValue();

    const data = JSON.parse(JSON.stringify(dataRaw));

    this.authService.register(data).subscribe({
      next: () => {
        this.sendEmailVerification(data.email);
      },
      error: (errors) => {
        this.applyBackendErrors(errors.error.errors);
      },
    });
  }

  private applyBackendErrors(errors: { [key: string]: string[] }) {
    for (const key in errors) {
      if (this.userFormular.controls.hasOwnProperty(key)) {
        this.userFormular
          .get(key)!
          .setErrors({ backend: errors[key].join(' ') });
      }
    }
  }
  private sendEmailVerification(email: string) {
    this.authService.emailConfirmation(email).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
