import { DestroyRef, Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.back_end}/notification`, {
      withCredentials: true,
    });

    this.socket.emit('connect-notification');
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  connect() {
    this.socket.connect();
  }

  onDestroy() {
    this.socket.disconnect();
  }
}
