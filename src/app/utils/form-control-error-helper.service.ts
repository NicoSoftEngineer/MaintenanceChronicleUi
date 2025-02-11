import { AbstractControl, FormGroup } from "@angular/forms";

export function addFormControlError(
  form: FormGroup,
  fieldName: string,
  errorKey: string,
  message:string,
): void {
  const control = form.get(fieldName)!;
  const errors = { [errorKey]: message || true };
  control.setErrors(errors);
}

export function getErrorMessage(control: AbstractControl | null, controlName: string): string | null{
  if (!control) return '';

  //If the input is focused, don't show the error message
  const firstNameElement = document.querySelector(`[formControlName="${controlName}"]`);
  let inputChild = firstNameElement?.querySelector('input');

  if (inputChild === document.activeElement) {
    return '';
  }
  if (control.hasError('email')) {
    return 'Email je ve špatném formátu';
  }
  if(control.hasError('backend')){
    return control.errors!['backend'];
  }
  if(control.hasError('passwordsDontMatch')){
    return control.errors!['passwordsDontMatch'];
  }
  return  null;
}
