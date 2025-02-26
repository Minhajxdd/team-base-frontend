import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.js';
import { Notification } from '../notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationDropService {
  constructor(private http: HttpClient) {}

  fetchUnmarkedNotifications() {
    return this.http.get<Notification[]>(
      `${environment.back_end}/notification`,
      {
        withCredentials: true,
      }
    );
  }

  markNotificationAsRead(notificationId: string) {
    const data = {
      notificationId,
    };

    return this.http.post(
      `${environment.back_end}/notification/mark-as-read`,
      data,
      { withCredentials: true }
    );
  }

  markAllNotification() {
    return this.http.delete(
      `${environment.back_end}/notification/mark-as-read/all`,
      { withCredentials: true }
    );
  }
}
