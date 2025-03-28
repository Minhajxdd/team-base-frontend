import { Component, ElementRef, input, output } from '@angular/core';
import { Comments } from '../../task-modal.model';
import { ProjectRoleService } from '../../../../../../shared/service/project.role.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comments-card',
  imports: [NgClass],
  templateUrl: './comments-card.component.html',
  styleUrl: './comments-card.component.css',
})
export class CommentsCardComponent {
  constructor(
    private ele: ElementRef,
    protected projectRoleService: ProjectRoleService
  ) {}

  comment = input.required<Comments | undefined>();
  deleteComment = output<string>();

  onDelete() {
    const comment = this.comment()?._id;
    if (comment) this.deleteComment.emit(comment);
    this.ele.nativeElement.remove();
  }
}
