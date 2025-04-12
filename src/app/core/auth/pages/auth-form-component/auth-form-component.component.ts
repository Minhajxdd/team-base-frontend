declare var google: any;

import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getAuthFormTemplate } from './auth-form.template';
import { authFormTemplateModel, googleData } from './auth-form.model';

import { AuthFormService } from './auth-form.service';
import { DataModel } from './auth-form-component.model';
import { GoogleAuthService } from '../../services/auth.google.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-form-component.component.html',
  styleUrl: './auth-form-component.component.css',
})
export class AuthFormComponentComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthFormService);
  private readonly router = inject(Router);
  private readonly googleAuthService = inject(GoogleAuthService);
  private readonly destoryRef = inject(DestroyRef);

  isRegister: boolean = true;
  authForm!: FormGroup<authFormTemplateModel>;

  errMsg = signal<string>('');

  constructor(private fb: FormBuilder) {
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
  @ViewChild('googleButton') googleButton!: ElementRef<HTMLButtonElement>;

  onGoogleClick() {
    const button = this.googleButton.nativeElement.querySelector(
      'div[role="button"]'
    ) as HTMLElement;
    if (button) {
      button.click();
    } else {
      console.error('Google button not found');
    }
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.gooogle_client_id,
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
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
            return this.errMsg.set(err);
          },
          complete: () => {
            this.router.navigate(['']);
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  // Register & Signup Logic
  onSubmit() {
    if (this.propertyIsValid('fullname')) {
      return this.errMsg.set(`Please Enter a valid Full Name`);
    }

    if (this.propertyIsValid('email')) {
      return this.errMsg.set('Please Enter Valid Email');
    }

    if (this.propertyIsValid('password')) {
      return this.errMsg.set(
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    if (this.propertyIsValid('repassword')) {
      return this.errMsg.set(
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    if (this.isRegister) {
      if (
        this.authForm.controls.password.value !==
        this.authForm.controls.repassword?.value
      ) {
        return this.errMsg.set('Both Passwords should be same');
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
      return this.errMsg.set('All Fields are required');
    }

    const data: DataModel = {
      fullName,
      email,
      password,
    };

    const subscription = this.authService.register(data).subscribe({
      next: (data: any) => {
        localStorage.setItem('auth-register-verify-email', data.email);
      },
      error: (err: string) => {
        return this.errMsg.set(err);
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
      return this.errMsg.set('All Fields are required');
    }

    const data: DataModel = {
      email,
      password,
    };

    const subscription = this.authService.login(data).subscribe({
      error: (err: string) => {
        return this.errMsg.set(err);
      },
      complete: () => {
        this.router.navigate(['']);
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
