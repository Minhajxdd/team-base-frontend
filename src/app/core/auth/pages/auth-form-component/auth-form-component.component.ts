declare var google: any;

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getAuthFormTemplate } from './auth-form.template';
import { authFormTemplateModel, googleData } from './auth-form.model';

import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthFormService } from './auth-form.service';
import { DataModel } from './auth-form-component.model';
import { GoogleAuthService } from '../../services/auth.google.service';

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule, Toast, RouterLink],
  templateUrl: './auth-form-component.component.html',
  styleUrl: './auth-form-component.component.css',
  providers: [MessageService],
})
export class AuthFormComponentComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthFormService);
  private readonly router = inject(Router);
  private readonly googleAuthService = inject(GoogleAuthService);
  private readonly destoryRef = inject(DestroyRef);

  isRegister: boolean = true;
  authForm!: FormGroup<authFormTemplateModel>;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    const subscription = this.route.url.subscribe((url) => {
      const path = url[0].path;
      this.isRegister = path === 'register';
      this.authForm = this.fb.group(getAuthFormTemplate(this.isRegister));
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // Google Auth
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '137833444543-cfdelosuq0llrqo8sps3ef4khrn58jd7.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 360,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode the token
      const payLoad: googleData = this.decodeToken(response.credential);
      // emitting
      const subscription = this.googleAuthService
        .googleLogin({
          email: payLoad.email,
          fullName: payLoad.name,
          jetId: payLoad.jetId,
          picture: payLoad.picture,
        })
        .subscribe({
          error: (err: string) => {
            return this.showWarningMessage(err);
          },
          complete: () => {
            this.router.navigate(['']);
          },
        });

        this.destoryRef.onDestroy(() => {
          subscription.unsubscribe();
        })

    }
  }

  // Register & Signup Logic
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

    const subscription = this.authService.register(data).subscribe({
      error: (err: string) => {
        return this.showWarningMessage(err);
      },
      complete: () => {
        this.router.navigate(['register', 'verify']);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
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

    const subscription = this.authService.login(data).subscribe({
      error: (err: string) => {
        return this.showWarningMessage(err);
      },
      complete: () => {
        this.router.navigate(['']);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
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
