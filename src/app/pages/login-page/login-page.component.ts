import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected formular = this.fb.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    const dataRaw = this.formular.getRawValue();

    const data = JSON.parse(JSON.stringify(dataRaw));

    this.authService.login(data).subscribe({
      next: async () => {
          await this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
