import { Component, DestroyRef, ElementRef, input } from '@angular/core';
import { Notification } from '../../notification.model';
import { Router } from '@angular/router';
import { NotificationDropService } from '../notification-drop.service';

@Component({
  selector: 'app-notification-drop-card',
  imports: [],
  templateUrl: './notification-drop-card.component.html',
  styleUrl: './notification-drop-card.component.css',
})
export class NotificationDropCardComponent {
  notification = input.required<Notification>();

  constructor(
    private router: Router,
    private notificationDropService: NotificationDropService,
    private ele: ElementRef,
    private destoryRef: DestroyRef
  ) {}

  redirectToPage() {
    this.router.navigate([this.notification().redirect_url]);
  }

  markAsRead() {
    const subscription = this.notificationDropService
      .markNotificationAsRead(this.notification()._id)
      .subscribe({
        complete: () => {
          this.ele.nativeElement.remove();
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
