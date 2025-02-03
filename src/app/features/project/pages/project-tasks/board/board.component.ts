import { Component, DestroyRef, OnInit, signal } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';
import { TaskCardComponent } from './task-card/task-card.component';

import {
  CdkDragDrop,
  DragDropModule,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { BoardCardModel } from './board.model';
import { Store } from '@ngrx/store';
import {
  selectProjectId,
  selectProjectRole,
  selectProjectUserId,
} from '../../../store/project.selector';
import { ProjectTasksService } from '../project-tasks.service';
import { NotificationSocketService } from '../../../../../shared/notification/notification.socket.service';

@Component({
  selector: 'app-board',
  imports: [SkeletonModule, DragDropModule, CommonModule, TaskCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  projectId!: string;
  role!: string | null;
  userId!: string | null;

  isLoading = signal<boolean>(false);

  todos: BoardCardModel[] = [];
  inprogresss: BoardCardModel[] = [];
  dones: BoardCardModel[] = [];

  constructor(
    private boardService: BoardService,
    private store: Store,
    private destoryRef: DestroyRef,
    private projectTasksService: ProjectTasksService,
    private notificationSocketService: NotificationSocketService
  ) {
    const subscription1 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    const subscription2 = this.store
      .select(selectProjectRole)
      .subscribe((data) => {
        this.role = data;
      });

    const subscription3 = this.store
      .select(selectProjectUserId)
      .subscribe((data) => {
        this.userId = data;
      });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    });

    this.fetchUserData();
  }

  ngOnInit(): void {
    const subscription = this.projectTasksService
      .getRefreshListener()
      .subscribe((data) => {
        if (data) this.fetchUserData(data);
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  fetchUserData(memberId?: string) {
    this.isLoading.set(false);
    const subscription = this.boardService
      .getTasks(this.projectId, memberId)
      .subscribe({
        next: (data) => {
          this.todos = data.filter(
            (task: BoardCardModel) => task.status === 'todo'
          );

          this.inprogresss = data.filter(
            (task: BoardCardModel) => task.status === 'progress'
          );

          this.dones = data.filter(
            (task: BoardCardModel) => task.status === 'done'
          );
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  drop(event: CdkDragDrop<BoardCardModel[]>) {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id;

      const taskId = task._id;

      const subscription = this.boardService
        .updateTaskStatus(this.projectId, taskId, newStatus)
        .subscribe();

      // Sent Notification on update task
      if (task.assignedTo._id !== this.userId) {
        this.sentTaskChangeNotification(task, newStatus);
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  sentTaskChangeNotification(task: BoardCardModel, status: string) {
    this.notificationSocketService.emit('send-notification', {
      senderId: task.assignedTo._id,
      title: `${task.title} Status Changed`,
      description: `${task.title} status changed to ${status}`,
      redirect_url: `project/${this.projectId}/tasks`,
    });
  }

  isDraggable(assignedTo: string) {
    if (this.userId !== assignedTo && this.role === 'developer') {
      return true;
    }
    return false;
  }
}
