import {
  booleanAttribute,
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { NotificationDropCardComponent } from './notification-drop-card/notification-drop-card.component';
import { NotificationDropService } from './notification-drop.service';
import { Notification } from '../notification.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-drop',
  imports: [NotificationDropCardComponent, FormsModule],
  templateUrl: './notification-drop.component.html',
  styleUrl: './notification-drop.component.css',
})
export class NotificationDropComponent implements OnInit {
  constructor(
    private notificationDropService: NotificationDropService,
    private destroyRef: DestroyRef
  ) {}

  notifications: Notification[] | null = null;

  isNotificationsLoading = signal<boolean>(true);

  isNotificationsChecked = true;

  ngOnInit(): void {
    this.fetchExistingNotifications();

    this.updateNotificationStatus();
  }

  fetchExistingNotifications() {
    this.isNotificationsLoading.set(true);
    const subscription = this.notificationDropService
      .fetchUnmarkedNotifications()
      .subscribe({
        next: (data) => {
          this.notifications = data;
        },
        complete: () => {
          this.isNotificationsLoading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  markAllNotification() {
    const subscription = this.notificationDropService
      .markAllNotification()
      .subscribe({
        complete: () => {
          this.notifications = null;
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  updateNotificationStatus() {
    const value = localStorage.getItem('project_notification_visibility');
    if (value) {
      const boolean = JSON.parse(value);
      this.isNotificationsChecked = boolean;
    }
  }

  onNotificationStatusChange() {
    const value = localStorage.getItem('project_notification_visibility');

    if (value) {
      const boolean = JSON.parse(value);

      return localStorage.setItem(
        'project_notification_visibility',
        JSON.stringify(!boolean)
      );
    }

    localStorage.setItem(
      'project_notification_visibility',
      JSON.stringify(false)
    );
  }
}
