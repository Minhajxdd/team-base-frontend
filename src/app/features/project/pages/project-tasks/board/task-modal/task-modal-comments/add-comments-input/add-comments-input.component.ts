import { Component, DestroyRef, input, output } from '@angular/core';
import { AddCommentsInputService } from './add-comments-input.service';
import { FormsModule } from '@angular/forms';
import { Comments } from '../../task-modal.model';

@Component({
  selector: 'app-add-comments-input',
  imports: [FormsModule],
  templateUrl: './add-comments-input.component.html',
  styleUrl: './add-comments-input.component.css',
})
export class AddCommentsInputComponent {
  taskId = input.required<string>();
  projectId = input.required<string>();

  newComment = output<Comments>();

  constructor(
    private addCommentsInputService: AddCommentsInputService,
    private destroyRef: DestroyRef
  ) {}

  value = '';

  closeInput = output<boolean>();

  onClose() {
    this.closeInput.emit(false);
  }

  submit() {
    const subscription = this.addCommentsInputService
      .addComment(this.value, this.taskId(), this.projectId())
      .subscribe({
        next: (data: any) => {
          this.newComment.emit(data.data);
        },
        complete: () => {
          this.onClose();
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
