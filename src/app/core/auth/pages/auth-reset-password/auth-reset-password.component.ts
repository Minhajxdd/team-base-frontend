import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthResetPasswordService } from './auth-reset-password.service';

@Component({
  selector: 'app-auth-reset-password',
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './auth-reset-password.component.html',
  styleUrl: './auth-reset-password.component.css',
  providers: [MessageService],
})
export class AuthResetPasswordComponent {
  form: FormGroup;

  constructor(
    private messageService: MessageService,
    private authResetPasswordService: AuthResetPasswordService,
    private fb: FormBuilder,
    private router: Router,
    private destoryRef: DestroyRef
  ) {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*[0-9@$!%*?&])[A-Za-z0-9@$!%*?&]*$/
          ),
        ],
      ],
      rePassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*[0-9@$!%*?&])[A-Za-z0-9@$!%*?&]*$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const pword = this.form.value.password;
      const repword = this.form.value.rePassword;

      if (pword !== repword) {
        return this.showWarningMessage('Both Password Should be Same');
      }

      const subscription = this.authResetPasswordService.resetPassword(pword).subscribe({
        error: (err) => {
          return this.showWarningMessage(err);
        },
        complete: () => {
          this.router.navigate(['login']);
        },
      });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      })

    } else {
      return this.showWarningMessage('Enter Valid Password');
    }
  }

  showWarningMessage(summary: string, detail: string = '') {
    return this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
}
