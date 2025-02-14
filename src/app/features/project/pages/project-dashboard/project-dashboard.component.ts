import { Component } from '@angular/core';
import { TasksCountBoxComponent } from "./tasks-count-box/tasks-count-box.component";
import { LatestTasksBoxComponent } from "./latest-tasks-box/latest-tasks-box.component";
import { QuickActionsBoxComponent } from "./quick-actions-box/quick-actions-box.component";

@Component({
  selector: 'app-project-dashboard',
  imports: [TasksCountBoxComponent, LatestTasksBoxComponent, QuickActionsBoxComponent],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {

}
