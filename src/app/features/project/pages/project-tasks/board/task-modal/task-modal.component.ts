import {
  Component,
  DestroyRef,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { TaskModalSubtaskComponent } from './task-modal-subtask/task-modal-subtask.component';
import { TaskModelService } from './task-model.service';
import { Store } from '@ngrx/store';
import { TaskModalFetchService } from './task-modal.service';
import { selectProjectId } from '../../../../store/project.selector';
import { TaskModel } from './task-modal.model';
import { TaskModalCommentsComponent } from "./task-modal-comments/task-modal-comments.component";

@Component({
  selector: 'app-task-modal',
  imports: [PortalModule, TaskModalSubtaskComponent, TaskModalCommentsComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  taskId = signal<string | null>(null);
  projectId!: string;

  task = signal<TaskModel | null>(null);

  isLoading = signal<boolean>(true);

  constructor(
    private overlay: Overlay,
    private taskModelService: TaskModelService,
    private destoryRef: DestroyRef,
    private taskModalFetchService: TaskModalFetchService,
    private store: Store
  ) {
    const subscription1 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

      // setTimeout(() => {
      //   // Temporary data
      //   this.taskId.set('678e20d74f37579d5b7b1ddc');
      //   this.openModal();
      //   this.fetchTaskData();

      // }, 1000)

    const subscription = this.taskModelService.getData().subscribe({
      next: (data) => {
        
        // Remove this return too 
        // return;
        if (data) {
          this.taskId.set(data);
          this.openModal();
          this.fetchTaskData();
        } else {
          this.closeModal();
        }
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription1.unsubscribe();
    });
  }

  fetchTaskData() {
    this.isLoading.set(true);

    const taskId = this.taskId();

    if (taskId) {
      const subscription = this.taskModalFetchService
        .getTasks(this.projectId, taskId)
        .subscribe({
          next: (data) => {
            this.task.set(data);
          },
          complete: () => {
            this.isLoading.set(false);
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  @ViewChild(CdkPortal) portal!: CdkPortal;

  overlayRef!: OverlayRef;

  openModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      width: '60%',
      hasBackdrop: true,
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  closeModal() {
    this.overlayRef.detach();
  }
}
