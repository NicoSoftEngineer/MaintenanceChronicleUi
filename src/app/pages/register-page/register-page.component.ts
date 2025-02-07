import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterUserDto } from '../../models/register-user-dto';
import { confirmPasswordValidator } from '../../../validators/confirm-password-validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected userFormular = this.fb.group({
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
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  },
{
validators: confirmPasswordValidator
});

  onSubmit(): void {
    console.log(this.userFormular.errors?.['PasswordNoMatch']);
    console.log(this.userFormular.hasError('PasswordNoMatch'));
  }
}
function tryd(form: any){
  console.log(form.errors?.['PasswordNoMatch']);
  console.log(form.hasError('PasswordNoMatch'));
}

