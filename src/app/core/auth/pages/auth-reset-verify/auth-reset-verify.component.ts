import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { ProgressSpinner } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthResetVerifyService } from './auth-reset-verify.service';

@Component({
  selector: 'app-auth-reset-verify',
  imports: [ToastModule, InputOtpModule, FormsModule, ProgressSpinner],
  templateUrl: './auth-reset-verify.component.html',
  styleUrl: './auth-reset-verify.component.css',
  providers: [MessageService],
})
export class AuthResetVerifyComponent {
  value: string = '';

  private messageService = inject(MessageService);
  private authResetVerifyService = inject(AuthResetVerifyService);
  private router = inject(Router);
  private destoryRef = inject(DestroyRef);

  onSubmit() {
    if (this.value.length !== 4) {
      return this.showMessage(`Otp Include 4 Numbers`);
    }

    const subscription = this.authResetVerifyService
      .sendOtp(this.value)
      .subscribe({
        error: (err) => {
          return this.showMessage(err);
        },
        complete: () => {
          this.router.navigate(['reset-password', 'change']);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  showMessage(message: string, severity = 'error') {
    this.messageService.add({
      severity: severity,
      summary: 'Invalid Input',
      detail: message,
    });
  }

  timeLeft = signal<number>(300);
  timer: any;

  isRunning: boolean = false;

  ngOnInit(): void {
    const savedTime = sessionStorage.getItem('timeLeft');
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      if (!isNaN(parsedTime)) {
        this.timeLeft.set(parsedTime);
      } else {
        console.error('Invalid time value retrieved from sessionStorage');
      }
    }
    this.startTime();
  }

  startTime() {
    this.isRunning = true;
    this.timer = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.set(this.timeLeft() - 1);

        sessionStorage.setItem('timeLeft', this.timeLeft().toString());
      } else {
        clearInterval(this.timer);
        this.isRunning = false;
      }
    }, 1000);
  }

  get formattedTime() {
    const date = new Date(0);
    date.setSeconds(this.timeLeft());
    return signal(date.toISOString().substr(14, 5));
  }
}
