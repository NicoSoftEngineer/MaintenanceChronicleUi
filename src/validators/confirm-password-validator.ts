import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log(control.get('passwordConfirm'));
    if (control.get('passwordConfirm')!.touched && !control.get('passwordConfirm')!.pending) {
    return control.value.password === control.value.passwordConfirm
      ? null
      : { PasswordNoMatch: 'Hesla se neshodují!' };
  }
  return null;
};
