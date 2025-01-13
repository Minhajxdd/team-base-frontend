import { Component, DestroyRef, inject } from '@angular/core';
import { authAdminFormTemplate } from './auth-admin-login.template';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { authFormTemplateModel } from '../auth-form-component/auth-form.model';
import { DataModel } from '../auth-form-component/auth-form-component.model';
import { Router } from '@angular/router';
import { AuthAdminFormService } from './auth-admin.login.service';

@Component({
  selector: 'app-auth-admin-login-page',
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './auth-admin-login-page.component.html',
  styleUrl: './auth-admin-login-page.component.css',
  providers: [MessageService],
})
export class AuthAdminLoginPageComponent {
  private messageService = inject(MessageService);
  private authService = inject(AuthAdminFormService);
  private router = inject(Router);
  private destoryRef = inject(DestroyRef);

  authForm: FormGroup<authFormTemplateModel>;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group(authAdminFormTemplate);
  }

  onSubmit() {
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

    this.submitData();
  }

  submitData() {
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!email || !password) {
      return this.showWarningMessage('All Fields are required');
    }

    const data: DataModel = {
      email,
      password,
    };

    let sucessFullyLogged = false;

    const subscription = this.authService.login(data).subscribe({
      next:(data: any) => {
        if(!data.isAdmin) {
          return this.showWarningMessage('No Admin Found!');
        } else {
          sucessFullyLogged = true;
        }
      },
      error: (err: string) => {
        return this.showWarningMessage(err);
      },
      complete: () => {
        if(sucessFullyLogged) {
          this.router.navigate(['admin', 'dashboard']);
        }
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }

  propertyIsValid(propertyName: keyof typeof this.authForm.controls) {
    const control = this.authForm.controls[propertyName];
    return control?.touched && control?.invalid;
  }

  showWarningMessage(summary: string, detail: string = '') {
    return this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
}
