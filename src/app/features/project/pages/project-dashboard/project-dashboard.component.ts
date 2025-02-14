import { Component } from '@angular/core';
import { TasksCountBoxComponent } from "./tasks-count-box/tasks-count-box.component";
import { LatestTasksBoxComponent } from "./latest-tasks-box/latest-tasks-box.component";

@Component({
  selector: 'app-project-dashboard',
  imports: [TasksCountBoxComponent, LatestTasksBoxComponent],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {

}
