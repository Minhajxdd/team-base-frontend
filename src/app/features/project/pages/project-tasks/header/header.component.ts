import { Component, DestroyRef, signal } from '@angular/core';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { Store } from '@ngrx/store';
import {
  selectProjectId,
  selectProjectRole,
} from '../../../store/project.selector';
import { AddTaskFormService } from './add-task-form/add-task-form.service';
import { MemberResponseModel } from './add-task-form/add-task-form.model';
import { ProjectTasksService } from '../project-tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [AddTaskFormComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  role!: string;
  projectId!: string;

  Members: MemberResponseModel[] = [];

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private addTaskFormService: AddTaskFormService,
    private projectTasksService: ProjectTasksService
  ) {
    const subscription1 = this.store
      .select(selectProjectRole)
      .subscribe((data) => {
        if (data) this.role = data;
      });

    const subscription2 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    const subscription3 = this.addTaskFormService
      .getMembers(this.projectId)
      .subscribe((data) => {
        this.Members = data;
      });

    this.destroyRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    });
  }

  isFormVisible = signal(false);

  onFormOpen() {
    this.isFormVisible.set(true);
  }

  onFormClose(value: boolean) {
    this.isFormVisible.set(value);
  }

  members: string = '';

  onDropChange(event: any) {
    this.projectTasksService.emitRefreshEvent(this.members);
  }
}
