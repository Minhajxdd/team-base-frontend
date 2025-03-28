import { FormControl } from '@angular/forms';

export interface authFormTemplateModel {
  fullname?: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  repassword?: FormControl<string | null>;
}

export interface RegisterResponseModel {
  status: string;
  message: string;
  data: {
    full_name: string;
    email: string;
    _id: string;
  };
  access_token: string;
}

export interface googleData {
  email: string;
  name: string;
  jetId?: string;
  picture?: string;
}
