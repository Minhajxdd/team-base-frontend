import { Component, inject } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthOtpPageService } from './auth-otp-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-otp-page',
  imports: [ProgressSpinner, InputOtpModule, FormsModule, ToastModule],
  templateUrl: './auth-otp-page.component.html',
  styleUrl: './auth-otp-page.component.css',
  providers: [MessageService],
})
export class AuthOtpPageComponent {
  value: any;

  private messageService = inject(MessageService);
  private authOtpPageService = inject(AuthOtpPageService);
  private router = inject(Router);

  onSubmit() {
    if (this.value.length !== 4) {
      return this.showErrorMessage(`Otp Include 4 Numbers`);
    }

    this.authOtpPageService.verify(this.value).subscribe({
      error: (err) => {
        return this.showErrorMessage(err);
      },
      complete: () => {
        return this.router.navigate(['/']);
      }
    });
  }

  showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Invalid Input',
      detail: message,
    });
  }
}
