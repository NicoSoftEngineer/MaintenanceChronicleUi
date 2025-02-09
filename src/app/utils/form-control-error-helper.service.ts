import { AbstractControl } from "@angular/forms";

export function addFormControlError(
  formControl: AbstractControl,
  errorKey: string,
  errorMessage: string
): void {
  if (formControl) {
    formControl.setErrors({
      ...formControl.errors, // Keep existing errors
      [errorKey]: errorMessage // Add new error
    });
  }
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
  return  null;
}


