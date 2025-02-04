import {
  Component,
  DestroyRef,
  ElementRef,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../../../store/project.selector';
import { AddTaskService } from './add-task.service';
import { SubTask } from '../../task-modal.model';

@Component({
  selector: 'app-add-task-input',
  imports: [FormsModule],
  templateUrl: './add-task-input.component.html',
  styleUrl: './add-task-input.component.css',
})
export class AddTaskInputComponent {
  addedSubTask = output<SubTask>();
  onAddedTaskClose = output<boolean>();

  taskId = input.required<string | undefined>();
  projectId!: string;

  constructor(
    private ele: ElementRef,
    private store: Store,
    private destoryRef: DestroyRef,
    private addTaskService: AddTaskService
  ) {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  value = '';

  onClose() {
    this.onAddedTaskClose.emit(false);
    this.ele.nativeElement.remove();
  }

  submit() {
    const taskId = this.taskId();
    if (taskId) {
      const subscription = this.addTaskService
        .addSubTask(this.value, taskId, this.projectId)
        .subscribe({
          next: (data: any) => {
            this.addedSubTask.emit(data.data);
          },
          complete: () => {
            this.value = '';
            this.onClose();
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
