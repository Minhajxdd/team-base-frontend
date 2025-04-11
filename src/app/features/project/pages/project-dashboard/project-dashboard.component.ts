import { Component } from '@angular/core';
import { TasksCountBoxComponent } from "./tasks-count-box/tasks-count-box.component";
import { LatestTasksBoxComponent } from "./latest-tasks-box/latest-tasks-box.component";
import { QuickActionsBoxComponent } from "./quick-actions-box/quick-actions-box.component";
import { QuickNotesBoxComponent } from "./quick-notes-box/quick-notes-box.component";

@Component({
  selector: 'app-project-dashboard',
  imports: [TasksCountBoxComponent, LatestTasksBoxComponent, QuickActionsBoxComponent, QuickNotesBoxComponent],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {

}
