import { Component, DestroyRef, input, signal } from '@angular/core';
import { SubTaskCardComponent } from './sub-task-card/sub-task-card.component';
import { SubTask } from '../task-modal.model';
import { AddTaskInputComponent } from './add-task-input/add-task-input.component';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../../store/project.selector';
import { NgClass } from '@angular/common';
import { ProjectRoleService } from '../../../../../shared/service/project.role.service';

@Component({
  selector: 'app-task-modal-subtask',
  imports: [NgClass, SubTaskCardComponent, AddTaskInputComponent],
  templateUrl: './task-modal-subtask.component.html',
  styleUrl: './task-modal-subtask.component.css',
})
export class TaskModalSubtaskComponent {
  subTasks = input.required<SubTask[] | undefined>();
  taskId = input.required<string>();
  assignedTo = input.required<string>();


  newTasks = signal<SubTask[]>([]);

  projectId!: string;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    protected projectRoleService: ProjectRoleService
  ) {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  openAddTask = signal<boolean>(false);

  onAddNewtask() {
    this.openAddTask.set(true);
  }

  onNewTask(task: SubTask) {
    this.newTasks.update((value) => [...this.newTasks(), task]);
  }

  onNewTaskClose(value: boolean) {
    this.openAddTask.set(value);
  }
}
