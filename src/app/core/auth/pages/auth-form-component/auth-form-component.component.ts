import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getAuthFormTemplate } from './auth-form.template';
import { authFormTemplateModel } from './auth-form.model';

import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthFormService } from './auth-form.service';
import { DataModel } from './auth-form-component.model';

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule, Toast, RouterLink],
  templateUrl: './auth-form-component.component.html',
  styleUrl: './auth-form-component.component.css',
  providers: [MessageService],
})
export class AuthFormComponentComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthFormService);
  private readonly router = inject(Router);

  isRegister: boolean = true;
  authForm!: FormGroup<authFormTemplateModel>;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.route.url.subscribe((url) => {
      const path = url[0].path;
      this.isRegister = path === 'register';
      this.authForm = this.fb.group(getAuthFormTemplate(this.isRegister));
    });
  }

  onSubmit() {
    if (this.propertyIsValid('fullname')) {
      return this.showWarningMessage(
        'Invalid Full Name',
        'Please Enter a valid Full Name'
      );
    }

    if (this.propertyIsValid('email')) {
      return this.showWarningMessage(
        'Invalid Email',
        'Please Enter Valid Email'
      );
    }

    if (this.propertyIsValid('password')) {
      return this.showWarningMessage(
        'Invalid Password',
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    if (this.propertyIsValid('repassword')) {
      return this.showWarningMessage(
        'Invalid Re-Enter Password',
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    if (this.isRegister) {
      if (
        this.authForm.controls.password.value !==
        this.authForm.controls.repassword?.value
      ) {
        return this.showWarningMessage(
          'Invalid Password',
          'Both Passwords should be same'
        );
      }

      return this.register();
    }
    return this.logIn();
  }

  register() {
    const fullName = this.authForm.controls.fullname?.value;
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!fullName || !email || !password) {
      return this.showWarningMessage('All Fields are required');
    }

    const data: DataModel = {
      fullName,
      email,
      password,
    };

    this.authService.register(data).subscribe({
      error: (err: string) => {
        return this.showWarningMessage(err);
      },
      complete: () => {
        this.router.navigate(['register', 'verify']);
      },
    });
  }

  logIn() {
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!email || !password) {
      return this.showWarningMessage('All Fields are required');
    }

    const data: DataModel = {
      email,
      password,
    };

    console.log(data);
  }

  showWarningMessage(summary: string, detail: string = '') {
    return this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: detail,
    });
  }

  propertyIsValid(propertyName: keyof typeof this.authForm.controls) {
    const control = this.authForm.controls[propertyName];
    return control?.touched && control?.invalid;
  }
}
