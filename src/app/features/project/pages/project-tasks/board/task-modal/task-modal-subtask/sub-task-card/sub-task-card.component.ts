import { Component, input } from '@angular/core';
import { SubTask } from '../../task-modal.model';

@Component({
  selector: 'app-sub-task-card',
  imports: [],
  templateUrl: './sub-task-card.component.html',
  styleUrl: './sub-task-card.component.css',
})
export class SubTaskCardComponent {
  subTask = input.required<SubTask | undefined>();
}
