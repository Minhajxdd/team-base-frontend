import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectTasksService {
  private refreshSubject: Subject<void> = new Subject<void>();

  emitRefreshEvent(): void {
    this.refreshSubject.next();
  }

  getRefreshListener(): Observable<void> {
    return this.refreshSubject.asObservable();
  }
}
