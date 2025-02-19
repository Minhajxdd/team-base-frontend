import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../../../environments/environment.development';
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
      console.log(`[ SFU ] Socket Connected`);
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  emitWithAck(event: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.timeout(5000).emit(event, data, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
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

  getSocket() {
    return this.socket;
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}
