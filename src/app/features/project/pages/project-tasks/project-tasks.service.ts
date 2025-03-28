import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectTasksService {
  private refreshSubject: Subject<string | null> = new Subject<string | null>();

  emitRefreshEvent(userId: string | null = null) {
    this.refreshSubject.next(userId);
  }

  getRefreshListener(): Observable<string | null> {
    return this.refreshSubject.asObservable();
  }
}
