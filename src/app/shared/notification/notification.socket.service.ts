import { DestroyRef, Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environmentts';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.back_end}/notification`, {
      withCredentials: true,
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    this.socket.emit('connect-notification');

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
