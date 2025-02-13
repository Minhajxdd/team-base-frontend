import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VcStreamService {
  private streams: { [userId: string]: MediaStream } = {};
  private streamsSubject = new BehaviorSubject<MediaStream[]>([]);

  constructor() { }

  setStream(stream: MediaStream, userId: string) {
    this.streams[userId] = stream;
    this.updateStreams();
  }

  removeStream(userId: string) {
    delete this.streams[userId];
    this.updateStreams();
  }

  getStream(): Observable<MediaStream[]> {
    return this.streamsSubject.asObservable();
  }

  private updateStreams() {
    this.streamsSubject.next(Object.values(this.streams));
  }
}
