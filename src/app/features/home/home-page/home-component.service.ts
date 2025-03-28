import { Injectable, signal } from '@angular/core';
import { Project } from './home-component.mode';

@Injectable({
  providedIn: 'root',
})
export class HomeComponentService {
  allProjectDetails = signal<Project[] | null>(null);


  pushValues(project: Project) {
    this.allProjectDetails.update((values) => {
      return [...(values ?? []), project]
    })
  }
}
