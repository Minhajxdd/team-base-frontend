import { FormControl, Validators } from '@angular/forms';
import { authFormTemplateModel } from '../auth-form-component/auth-form.model';

export const authAdminFormTemplate: authFormTemplateModel = {
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
};
