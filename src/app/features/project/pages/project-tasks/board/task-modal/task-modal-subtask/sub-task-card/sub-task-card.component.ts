import { Component, DestroyRef, ElementRef, input, output } from '@angular/core';
import { SubTask } from '../../task-modal.model';
import { SubTaskService } from './sub-task.service';

@Component({
  selector: 'app-sub-task-card',
  imports: [],
  templateUrl: './sub-task-card.component.html',
  styleUrl: './sub-task-card.component.css',
})
export class SubTaskCardComponent {
  projectId = input.required<string>();
  subTask = input.required<SubTask | undefined>();
  taskId = input.required<string>();

  constructor(
    private subTaskService: SubTaskService,
    private destoryRef: DestroyRef,
    private ele: ElementRef
  ) {}

  onEditTask() {
    const subscription = this.subTaskService
      .editSubStatus(this.taskId(), this.subTask()?._id || '', this.projectId())
      .subscribe();

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onDeleteTask() {
    const subscription = this.subTaskService
      .deleteSubTask(this.taskId(), this.subTask()?._id || '', this.projectId())
      .subscribe({
        complete: () => {
          this.DeleteTask()
        }
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  DeleteTask() {
    this.ele.nativeElement.remove();
  }
}
