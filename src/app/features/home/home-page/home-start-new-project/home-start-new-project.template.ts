import { FormControl, FormGroup, Validators } from '@angular/forms';

export const NewProjectFormGroup = new FormGroup({
  title: new FormControl('', [
    Validators.required,
    noSymbolsOrNumbers(),
    notEmptySpaces(),
  ]),
  description: new FormControl('', [
    Validators.required,
    noSymbolsOrNumbers(),
    notEmptySpaces(),
  ]),
  capacity: new FormControl(0, [Validators.required, Validators.min(0)]),
});

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function noSymbolsOrNumbers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = /^[a-zA-Z\s]*$/.test(value.trim());
    return isValid ? null : { invalidCharacters: true };
  };
}

function notEmptySpaces(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = value.trim().length > 0;
    return isValid ? null : { emptySpaces: true };
  };
}
