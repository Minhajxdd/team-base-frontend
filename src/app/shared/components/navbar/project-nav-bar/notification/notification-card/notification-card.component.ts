import {
  Component,
  ElementRef,
  input,
} from '@angular/core';

@Component({
  selector: 'app-notification-card',
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  notificationData = input<{
    title: string;
    description: string;
    redirect_url: string;
  }>();
  
  constructor(private ele: ElementRef) {
    setTimeout(() => {
      this.ele.nativeElement.remove();
    }, 5000);
  }
  
  
  destoryComponent() {
    this.ele.nativeElement.remove();
  }
}
