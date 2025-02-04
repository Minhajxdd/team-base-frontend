import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BoardCardModel } from '../board.model';

@Injectable({
  providedIn: 'root',
})
export class TaskModelService {
  private dataSubject = new Subject<BoardCardModel | null>();

  setData(task: BoardCardModel) {
    this.dataSubject.next(task);
  }

  getData(): Observable<BoardCardModel | null> {
    return this.dataSubject.asObservable();
  }
}
