import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { TaskModalSubtaskComponent } from './task-modal-subtask/task-modal-subtask.component';
import { TaskModelService } from './task-model.service';
import { BoardCardModel } from '../board.model';

@Component({
  selector: 'app-task-modal',
  imports: [PortalModule, TaskModalSubtaskComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  
  task = signal<BoardCardModel | null>(null);
  constructor(
    private overlay: Overlay,
    private taskModelService: TaskModelService,
    private destoryRef: DestroyRef
  ) {
    const subscription = this.taskModelService.getData().subscribe({
      next: (data) => {
        if(data) {
          this.task.set(data);
          this.openModal();
        } else {
          this.closeModal();
        }

      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })
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
