import { Component, DestroyRef, input, OnInit } from '@angular/core';
import { projectMember } from '../project-members.dispaly.model';
import { RoleChangeFormComponent } from './role-change-form/role-change-form.component';
import { Store } from '@ngrx/store';
import {
  selectProjectId,
  selectProjectRole,
} from '../../../../store/project.selector';
import { DeleteUserDialogeComponent } from './delete-user-dialoge/delete-user-dialoge.component';
import { ProfileCardService } from './profile-card.service';
import { ProjectMembersShared } from '../../project-members.shared';

@Component({
  selector: 'app-profile-card',
  imports: [RoleChangeFormComponent, DeleteUserDialogeComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
})
export class ProfileCardComponent implements OnInit {
  member = input.required<projectMember>();

  isEditFormVisible = false;
  isDeleteDialogeVisible = false;

  projectRole: string | null = null;
  projectId!: string;

  constructor(
    private store: Store,
    private destoryRef: DestroyRef,
    private profileCardService: ProfileCardService,
    private projectMembersShared: ProjectMembersShared
  ) {}

  ngOnInit(): void {
    const subscription1 = this.store
      .select(selectProjectRole)
      .subscribe((data) => {
        this.projectRole = data;
      });

    const subscription2 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  }

  onOpenForm() {
    this.isEditFormVisible = true;
  }

  onCloseForm(event: boolean) {
    this.isEditFormVisible = event;
  }

  onOpenDeleteDialoge() {
    this.isDeleteDialogeVisible = true;
  }

  onCloseDeleteDialoge(event: boolean) {
    this.isDeleteDialogeVisible = event;
  }

  RemoveUser() {
    const subscription = this.profileCardService
      .DeleteUser(this.projectId, this.member().userId._id)
      .subscribe({
        complete: () => {
          this.projectMembersShared.changeMessage();
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
