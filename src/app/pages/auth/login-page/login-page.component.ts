import { AlertStateService } from '../../../components/alert/alert-state.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { applyBackendErrors, getErrorMessage } from '../../../utils/form-control-error-helper.service';
import { AlertComponent } from '../../../components/alert/alert.component';

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
export class LoginPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;
  protected readonly applyBackendErrors = applyBackendErrors;
  protected showInvalidInfoAlert = false;

  shouldShowError = computed(() => {
    console.log("the value of visible should be "+this.showInvalidInfoAlert)
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

  onSubmit(): void {
    const dataRaw = this.formular.getRawValue();

    const data = JSON.parse(JSON.stringify(dataRaw));

    this.authService.login(data).subscribe({
      next: async () => {
          await this.router.navigate(['/']);
      },
      error: (errors) => {
        this.alertStateService.openAlert('Špatné přihlašovací údaje');
      }
    });
  }
}
