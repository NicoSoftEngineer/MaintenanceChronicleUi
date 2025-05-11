import { AlertStateService } from '../../../components/alert/alert-state.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { applyBackendErrors, getErrorMessage } from '../../../utils/form-control-error-helper.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { AuthService } from '../../../services/auth-service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        FormInputComponent,
        AlertComponent
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute)
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;
  protected readonly applyBackendErrors = applyBackendErrors;
  protected showInvalidInfoAlert = false;

  shouldShowError = computed(() => {
    return this.showInvalidInfoAlert;
  });

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

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params['email']) {
      this.formular.get('email')?.setValue(params['email']);
    }
    if (params['message']) {
      this.alertStateService.openAlert(params['message'], 'error');
    }
  }

  onSubmit(): void {
    this.formular.markAllAsTouched();
    if (this.formular.invalid) {
      return;
    }

    const dataRaw = this.formular.getRawValue();

    const data = JSON.parse(JSON.stringify(dataRaw));

    this.authService.login(data).subscribe({
      next: async () => {
          await this.authService.checkLoginStatus();
          await this.router.navigate(['/']);
      },
      error: (errors) => {
        this.alertStateService.openAlert('Špatné přihlašovací údaje', 'error');
      }
    });
  }
}
