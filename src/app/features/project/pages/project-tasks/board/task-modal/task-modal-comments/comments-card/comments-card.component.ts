import { Component, ElementRef, input, output } from '@angular/core';
import { Comments } from '../../task-modal.model';

@Component({
  selector: 'app-comments-card',
  imports: [],
  templateUrl: './comments-card.component.html',
  styleUrl: './comments-card.component.css',
})
export class CommentsCardComponent {
  constructor(private ele: ElementRef) {}

  comment = input.required<Comments | undefined>();
  deleteComment = output<string>();

  onDelete() {
    const comment = this.comment()?._id;
    if(comment)
    this.deleteComment.emit(comment);
    this.ele.nativeElement.remove()
  }
}
