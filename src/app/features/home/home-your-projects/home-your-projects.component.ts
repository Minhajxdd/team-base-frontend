import { Component, inject, signal } from '@angular/core';
import { HomeYourProjectsService } from './home-your-projects.component.service';
import { ProjectBoxComponent } from './project-box/project-box.component';
import { Skeleton } from 'primeng/skeleton';
import { Project } from '../home-component.mode';
import { HomeComponentService } from '../home-component.service';

@Component({
  selector: 'app-home-your-projects',
  imports: [ProjectBoxComponent, Skeleton],
  templateUrl: './home-your-projects.component.html',
  styleUrl: './home-your-projects.component.css',
})
export class HomeYourProjectsComponent {
  private readonly homeYourProjectsService = inject(HomeYourProjectsService);
  private homeComponentService = inject(HomeComponentService);

  allProjectDetails = this.homeComponentService.allProjectDetails;
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.homeYourProjectsService.getProjectDetails().subscribe({
      next: (data) => {
        this.homeComponentService.allProjectDetails.set(data.data.projects);
        console.log(this.allProjectDetails)
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
