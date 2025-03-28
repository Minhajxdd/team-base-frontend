import { DestroyRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProjectRole,
  selectProjectUserId,
} from '../../store/project.selector';

@Injectable({
  providedIn: 'root',
})
export class ProjectRoleService {
  private _userId: string = '';
  private _projectRole: string = '';

  constructor(private store: Store, private destoryRef: DestroyRef) {
    const subscription = this.store
      .select(selectProjectUserId)
      .subscribe((data) => {
        if (data) {
          this._userId = data;
        }
      });

    const subscription1 = this.store
      .select(selectProjectRole)
      .subscribe((data) => {
        if (data) {
          this._projectRole = data;
        }
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription1.unsubscribe();
    });
  }

  isCurrentUser(userId: string) {
    return this._userId === userId;
  }

  isAdmin(): boolean {
    if (
      this._projectRole === 'project_manager' ||
      this._projectRole === 'team_lead'
    ) {
      return true;
    }
    return false;
  }

  doesHavePermission(userId: string): boolean {
    if (userId === this._userId) {
      return true;
    } else if (
      this._projectRole === 'project_manager' ||
      this._projectRole === 'team_lead'
    ) {
      return true;
    }
    return false;
  }
}
