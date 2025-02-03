import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NotificationSocketService } from '../../../../notification/notification.socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.development';
import { ToastModule } from 'primeng/toast';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notification',
  imports: [ToastModule, NotificationCardComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  private readonly notificationSocketService = inject(
    NotificationSocketService
  );
  private http = inject(HttpClient);

  private worker!: Worker;

  currentNotification = signal<Notification | null>(null);

  ngOnInit(): void {
    this.worker = new Worker(
      new URL('./notification.worker.ts', import.meta.url)
    );

    this.notificationSocketService.on('notification').subscribe({
      next: (data: Notification) => {
        this.worker.postMessage(data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.worker.onmessage = ({ data }) => {
      this.currentNotification.set(data);
      setTimeout(() => {
        this.currentNotification.set(null);
      }, 5100);
    };

    this.sendSampleNotificaoitn();
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }

  sendSampleNotificaoitn() {
    this.notificationSocketService.emit('send-notification', {
      senderId: '678f3d6dcb15516c96de58b1',
      title: 'Notification Title',
      description:
        'This is the description area were it contains all the descriptions and things like that is found here',
      redirect_url: 'http://www.google.com',
    });
  }

  fetchHttpData() {
    this.http
      .get(`${environment.back_end}/notification`, { withCredentials: true })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
