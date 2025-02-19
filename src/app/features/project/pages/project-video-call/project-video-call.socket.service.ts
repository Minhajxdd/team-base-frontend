import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectVideoCallSocket {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.back_end}/sfu`, {
      withCredentials: true,
    });

    this.socket.on('connect', () => {
        console.log(`[SFU] Socket Connected`);
    })

  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  emitWithAck(event: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.socket.timeout(5000).emit(event, data, (err: any, response: any) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
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

  disconnect() {
    this.socket.disconnect();
  }
}
