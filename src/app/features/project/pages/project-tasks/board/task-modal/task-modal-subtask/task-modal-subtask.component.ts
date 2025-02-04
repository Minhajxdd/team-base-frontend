import { Component, input } from '@angular/core';
import { SubTaskCardComponent } from './sub-task-card/sub-task-card.component';
import { SubTasks } from '../../board.model';

@Component({
  selector: 'app-task-modal-subtask',
  imports: [SubTaskCardComponent],
  templateUrl: './task-modal-subtask.component.html',
  styleUrl: './task-modal-subtask.component.css',
})
export class TaskModalSubtaskComponent {
  subTasks = input.required<SubTasks[] | undefined>();
}
