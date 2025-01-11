import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
export class AuthOtpPageComponent implements OnInit, OnDestroy {
  value: any;

  private messageService = inject(MessageService);
  private authOtpPageService = inject(AuthOtpPageService);
  private router = inject(Router);

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

  ngOnDestroy(): void {
    clearInterval(this.timer);
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

  resetTimer() {
    this.timeLeft.set(300);
    if (this.isRunning) {
      clearInterval(this.timer);
    }
    this.startTime();
    sessionStorage.setItem('timeLeft', this.timeLeft().toString());
  }

  get formattedTime(){
    const date = new Date(0);
    date.setSeconds(this.timeLeft());
    return signal(date.toISOString().substr(14, 5));
  }

  onSubmit() {
    if (this.value.length !== 4) {
      return this.showMessage(`Otp Include 4 Numbers`);
    }

    this.authOtpPageService.verify(this.value).subscribe({
      error: (err) => {
        return this.showMessage(err);
      },
      complete: () => {
        return this.router.navigate(['/']);
      },
    });
  }

  onResend() {
    this.authOtpPageService.resend().subscribe({
      error: (err) => {
        return this.showMessage(err);
      },
      complete: () => {
        return this.showMessage('New Otp Send', 'success');
        this.resetTimer();
      },
    });
  }

  showMessage(message: string, severity = 'error') {
    this.messageService.add({
      severity: severity,
      summary: 'Invalid Input',
      detail: message,
    });
  }
}
