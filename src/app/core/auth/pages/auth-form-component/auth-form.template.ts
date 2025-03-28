import { FormControl, Validators } from '@angular/forms';
import { authFormTemplateModel } from './auth-form.model';

export function getAuthFormTemplate(isRegister: boolean) {
  const authFormTemplate: authFormTemplateModel = {
    fullname: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[A-Za-z ]+$/),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*[0-9@$!%*?&])[A-Za-z0-9@$!%*?&]*$/
        ),
      ],
    }),
    repassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*[0-9@$!%*?&])[A-Za-z0-9@$!%*?&]*$/
        ),
      ],
    }),
  };

  if (!isRegister) {
    delete authFormTemplate.repassword;
    delete authFormTemplate.fullname;
  }

  return authFormTemplate;
}
