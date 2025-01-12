import { Component, input } from '@angular/core';
import { Project } from '../../home-component.mode';

@Component({
  selector: 'app-project-box',
  imports: [],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.css',
})
export class ProjectBoxComponent {
  projectData = input.required<Project>();
}
