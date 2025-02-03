import { Component, inject, OnInit } from '@angular/core';
import { NotificationSocketService } from '../../../../notification/notification.socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.development';
import { ToastModule } from 'primeng/toast';
import { NotificationCardComponent } from './notification-card/notification-card.component';

@Component({
  selector: 'app-notification',
  imports: [ToastModule, NotificationCardComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationSocketService = inject(
    NotificationSocketService
  );
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.notificationSocketService.on('notification').subscribe({
      next: (data: Notification) => {
        console.log(`This is the data from notification`);
        console.log(data);
      },
      error: (err) => {
        console.log(`This is the error from notification`);
        console.log(err);
      },
    });
    this.sendSampleNotificaoitn()
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
