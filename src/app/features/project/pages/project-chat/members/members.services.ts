import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { projectMember } from '../../project-members/project-members-display/project-members.dispaly.model';

@Injectable({
  providedIn: 'root',
})
export class MembersServices {
  private projectMembersSubject: BehaviorSubject<projectMember[]> =
    new BehaviorSubject<projectMember[]>([]);
  projectMembers$: Observable<projectMember[]> =
    this.projectMembersSubject.asObservable();

  constructor(private http: HttpClient, private destoryRef: DestroyRef) {}

  FetchProjectMembers(projectId: string): void {
    const subscription = this.http
      .get<projectMember[]>(
        `${environment.back_end}/project/${projectId}/members/details`,
        { withCredentials: true }
      )
      .subscribe((members: projectMember[]) => {
        this.projectMembersSubject.next(members);
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
