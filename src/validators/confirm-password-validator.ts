import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('password');
  const confirmPassword = control.parent?.get('passwordConfirm');
  if (!confirmPassword?.dirty) {
    return null;
  }
  return password?.value == confirmPassword?.value ?
    null :
    { passwordsDontMatch: 'Hesla se neshodují' };
};
