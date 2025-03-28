import { Component, input, output } from '@angular/core';
import { BoardCardModel } from '../board.model';
import { DatePipe } from '@angular/common';
import { TaskModelService } from '../task-modal/task-model.service';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  constructor(private taskModelService: TaskModelService) {}

  task = input.required<BoardCardModel>();

  onOpenDetails() {
    this.taskModelService.setData(this.task()._id);
  }
}
