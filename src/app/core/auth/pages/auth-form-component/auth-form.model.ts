import { FormControl } from '@angular/forms';

export interface authFormTemplateModel {
  fullname?: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  repassword?: FormControl<string | null>;
}
