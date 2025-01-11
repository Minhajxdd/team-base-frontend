import { Component } from '@angular/core';
import { HomeWelcomeBannerComponent } from "./home-welcome-banner/home-welcome-banner.component";
import { HomeYourProjectsComponent } from "./home-your-projects/home-your-projects.component";
import { HomeStartNewProjectComponent } from "./home-start-new-project/home-start-new-project.component";
import { HomeRecentTasksComponent } from "./home-recent-tasks/home-recent-tasks.component";

@Component({
  selector: 'app-home',
  imports: [HomeWelcomeBannerComponent, HomeYourProjectsComponent, HomeStartNewProjectComponent, HomeRecentTasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
}
