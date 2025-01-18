import {
  Component,
  DestroyRef,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Dialog } from 'primeng/dialog';
import { roles } from '../../../project-members.constants';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

import { RoleChangeFormService } from './role-change-form.service';

import { Store } from '@ngrx/store';

import { getProjectId } from '../../../../../store/project.selector';
import { MessageService } from 'primeng/api';
import { ProjectMembersShared } from '../../../project-members.shared';

@Component({
  selector: 'app-role-change-form',
  imports: [Dialog, FormsModule, DropdownModule, ToastModule],
  templateUrl: './role-change-form.component.html',
  styleUrl: './role-change-form.component.css',
})
export class RoleChangeFormComponent {
  isVisible = input.required<boolean>();
  userId = input.required<string>();

  closeForm = output<boolean>();

  selectedRole: string = '';

  roles = roles;

  constructor(
    private readonly roleChangeFormService: RoleChangeFormService,
    private readonly destoryRef: DestroyRef,
    private readonly store: Store<{ project: { projectId: string } }>,
    private messageService: MessageService,
    private projectMembersShared: ProjectMembersShared
  ) {}

  onCloseForm() {
    this.closeForm.emit(false);
  }

  onSubmit(form: any) {
    if (form.valid) {
      const role = form.value.role.value;

      let projectId = '';

      const subscription1 = this.store
        .select(getProjectId)
        .subscribe((data) => {
          projectId = data;
        });

      const subscription2 = this.roleChangeFormService
        .changeRole(projectId, this.userId(), role)
        .subscribe({
          complete: () => {
            this.onCloseForm();

            this.messageService.add({
              severity: 'success',
              summary: 'Successfully update role',
            });

            this.projectMembersShared.changeMessage();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Something Went wrong',
            });
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription1.unsubscribe();
        subscription2.unsubscribe();
      });
    }
  }
}
