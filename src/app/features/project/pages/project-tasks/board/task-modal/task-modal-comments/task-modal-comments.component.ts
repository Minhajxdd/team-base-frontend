import { Component, DestroyRef, input, signal } from '@angular/core';
import { AddCommentsInputComponent } from './add-comments-input/add-comments-input.component';
import { CommentsCardComponent } from './comments-card/comments-card.component';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../../store/project.selector';
import { Comments } from '../task-modal.model';
import { CommentsCardService } from './comments-card/comments-card.service';

@Component({
  selector: 'app-task-modal-comments',
  imports: [AddCommentsInputComponent, CommentsCardComponent],
  templateUrl: './task-modal-comments.component.html',
  styleUrl: './task-modal-comments.component.css',
})
export class TaskModalCommentsComponent {
  taskId = input.required<string>();
  projectId = signal<string>('');
  comments = input.required<Comments[] | undefined>();
  newComments = signal<Comments[]>([]);

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private commentsCardService: CommentsCardService
  ) {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId.set(data);
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  openAddComment = signal<boolean>(false);

  onAddNewComment() {
    this.openAddComment.set(true);
  }

  onNewTaskClose(value: boolean) {
    this.openAddComment.set(value);
  }

  onNewComment(data: Comments) {
    this.newComments.update((comment) => [...this.newComments(), data]);
  }

  onDeleteComment(commentId: string) {
    const subscription = this.commentsCardService
      .deleteCard(commentId, this.taskId(), this.projectId())
      .subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
