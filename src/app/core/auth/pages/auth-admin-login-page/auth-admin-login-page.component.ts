import { Component, DestroyRef, inject, signal } from '@angular/core';
import { authAdminFormTemplate } from './auth-admin-login.template';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { authFormTemplateModel } from '../auth-form-component/auth-form.model';
import { DataModel } from '../auth-form-component/auth-form-component.model';
import { Router } from '@angular/router';
import { AuthAdminFormService } from './auth-admin.login.service';

@Component({
  selector: 'app-auth-admin-login-page',
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './auth-admin-login-page.component.html',
  styleUrl: './auth-admin-login-page.component.css',
})
export class AuthAdminLoginPageComponent {
  private authService = inject(AuthAdminFormService);
  private router = inject(Router);
  private destoryRef = inject(DestroyRef);

  authForm: FormGroup<authFormTemplateModel>;

  errMsg = signal<string>('');

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group(authAdminFormTemplate);
  }

  onSubmit() {
    if (this.propertyIsValid('email')) {
      this.errMsg.set('Please Enter Valid Email');
    }

    if (this.propertyIsValid('password')) {
      this.errMsg.set(
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    this.submitData();
  }

  submitData() {
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!email || !password) {
      return this.errMsg.set('All Fields are required');
    }

    const data: DataModel = {
      email,
      password,
    };

    let sucessFullyLogged = false;

    const subscription = this.authService.login(data).subscribe({
      next: (data: any) => {
        if (!data.isAdmin) {
          this.errMsg.set('No Admin Found!');
        } else {
          sucessFullyLogged = true;
        }
      },
      error: (err: string) => {
        this.errMsg.set(err);
      },
      complete: () => {
        if (sucessFullyLogged) {
          this.router.navigate(['admin', 'dashboard']);
        }
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  propertyIsValid(propertyName: keyof typeof this.authForm.controls) {
    const control = this.authForm.controls[propertyName];
    return control?.touched && control?.invalid;
  }
}
