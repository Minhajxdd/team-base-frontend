import { Component, DestroyRef, ElementRef, input } from '@angular/core';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-notification-card',
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  notificationData = input<Notification | null>();

  constructor(private ele: ElementRef, private _destoryRef: DestroyRef) {
    const timer = setTimeout(() => {
      this.ele.nativeElement.remove();
    }, 5000);

    this._destoryRef.onDestroy(() => {
      clearTimeout(timer);
    })
  }

  destoryComponent() {
    this.ele.nativeElement.remove();
  }
}
