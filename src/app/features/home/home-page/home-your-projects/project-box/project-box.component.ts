import { Component, input } from '@angular/core';
import { Project } from '../../home-component.mode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-box',
  imports: [RouterLink],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.css',
})
export class ProjectBoxComponent {
  projectData = input.required<Project>();
}
