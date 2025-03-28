import { Component, DestroyRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksCountBoxService } from './tasks-count-box.service';
import { selectProjectId } from '../../../store/project.selector';

@Component({
  selector: 'app-tasks-count-box',
  imports: [],
  templateUrl: './tasks-count-box.component.html',
  styleUrl: './tasks-count-box.component.css',
})
export class TasksCountBoxComponent {
  projectId!: string;
  todo!: number;
  progress!: number;
  done!: number;
  isLoading = true;

  constructor(
    private readonly store: Store,
    private readonly _tasksCountBoxService: TasksCountBoxService,
    private readonly destoryRef: DestroyRef
  ) {
    const subscription1 = this.store.select(selectProjectId).subscribe({
      next: (data) => {
        this.projectId = data;
      },
    });

    const subscription2 = this._tasksCountBoxService
      .getTasksCount(this.projectId)
      .subscribe({
        next: (data) => {
          data.data.forEach((val) => {
            switch (val._id.status) {
              case 'progress':
                this.progress = val.count;
                break;
              case 'todo':
                this.todo = val.count;
                break;
              case 'done':
                this.done = val.count;
                break;
            }
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  }
}
