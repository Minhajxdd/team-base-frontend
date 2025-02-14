import { Component, DestroyRef } from '@angular/core';
import { LatestTaksBoxService } from './latest-tasks-box.service';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../store/project.selector';
import { Task } from './latest-task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-latest-tasks-box',
  imports: [DatePipe],
  templateUrl: './latest-tasks-box.component.html',
  styleUrl: './latest-tasks-box.component.css',
})
export class LatestTasksBoxComponent {
  projectId!: string;
  todos!: Task[];
  progresss!: Task[];

  constructor(
    private readonly store: Store,
    private readonly _latestTaksBoxService: LatestTaksBoxService,
    private readonly destoryRef: DestroyRef
  ) {
    const subscription1 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    const subscription2 = this._latestTaksBoxService
      .getLatestTasks(this.projectId)
      .subscribe({
        next: (data) => {
          data.data.forEach((data) => {
            switch (data._id) {
              case 'todo':
                this.todos = data.lastTwoTasks;
                break;
              case 'progress':
                this.progresss = data.lastTwoTasks;
                break;
            }
          });
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  }
}
