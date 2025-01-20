import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-project-tasks',
  imports: [HeaderComponent, BoardComponent],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ProjectTasksComponent {}
