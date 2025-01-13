import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthResetPwEmailService } from './auth-reset-pw-email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-reset-pw-email',
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './auth-reset-pw-email.component.html',
  styleUrl: './auth-reset-pw-email.component.css',
  providers: [MessageService],
})
export class AuthResetPwEmailComponent {
  form: FormGroup;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private authResetPwEmailService: AuthResetPwEmailService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.value.email;

      this.authResetPwEmailService.sendEmail(email).subscribe({
        error: (err) => {
          this.showWarningMessage(err);
        },
        complete: () => {
          this.router.navigate(['reset-password', 'verify']);
        },
      });
    } else {
      return this.showWarningMessage(`Please fill in the required fields`);
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
