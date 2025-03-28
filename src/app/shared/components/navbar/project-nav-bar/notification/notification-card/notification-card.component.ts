import { Component, ElementRef, input } from '@angular/core';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-notification-card',
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  notificationData = input<Notification | null>();

  constructor(private ele: ElementRef) {
    setTimeout(() => {
      this.ele.nativeElement.remove();
    }, 5000);
  }

  destoryComponent() {
    this.ele.nativeElement.remove();
  }
}
