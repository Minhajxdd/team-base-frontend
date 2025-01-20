import { Component, input } from '@angular/core';
import { BoardCardModel } from '../board.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  task = input.required<BoardCardModel>();
}
