import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NotificationSocketService } from '../../../../notification/notification.socket.service';
import { ToastModule } from 'primeng/toast';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { Notification } from './notification.model';
import { NotificationDropComponent } from './notification-drop/notification-drop.component';

@Component({
  selector: 'app-notification',
  imports: [ToastModule, NotificationCardComponent, NotificationDropComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  private readonly notificationSocketService = inject(
    NotificationSocketService
  );
  private worker!: Worker;

  constructor() {
    this.notificationSocketService.connect();
  }

  currentNotification = signal<Notification | null>(null);

  showNotification: boolean = true;

  ngOnInit(): void {
    this.worker = new Worker(
      new URL('./notification.worker.ts', import.meta.url)
    );

    this.getShowNotification();

    this.notificationSocketService.on('notification').subscribe({
      next: (data: Notification) => {
        this.getShowNotification();
        if (this.showNotification) {
          this.worker.postMessage(data);
        }
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
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }

  getShowNotification() {
    const value = localStorage.getItem('project_notification_visibility');

    if (value) {
      this.showNotification = JSON.parse(value);
    }
  }

  // Toggle Notification
  isToggled = signal<boolean>(false);

  toggleDropDown() {
    this.isToggled.set(!this.isToggled());
  }
}
