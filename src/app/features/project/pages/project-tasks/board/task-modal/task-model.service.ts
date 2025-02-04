import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BoardCardModel } from '../board.model';

@Injectable({
  providedIn: 'root',
})
export class TaskModelService {
  private dataSubject = new Subject<string | null>();

  setData(taskId: string) {
    this.dataSubject.next(taskId);
  }

  getData(): Observable<string | null> {
    return this.dataSubject.asObservable();
  }
}
