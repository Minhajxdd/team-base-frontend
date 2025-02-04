import { Component, input, signal } from '@angular/core';
import { SubTaskCardComponent } from './sub-task-card/sub-task-card.component';
import { SubTask } from '../task-modal.model';
import { AddTaskInputComponent } from './add-task-input/add-task-input.component';

@Component({
  selector: 'app-task-modal-subtask',
  imports: [SubTaskCardComponent, AddTaskInputComponent],
  templateUrl: './task-modal-subtask.component.html',
  styleUrl: './task-modal-subtask.component.css',
})
export class TaskModalSubtaskComponent {
  subTasks = input.required<SubTask[] | undefined>();
  taskId = input.required<string | undefined>();

  newTasks = signal<SubTask[]>([]);

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
