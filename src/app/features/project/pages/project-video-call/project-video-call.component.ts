import { Component } from '@angular/core';
import { ProjectVideoCallSocket } from './service/project-video-call.socket.service';

@Component({
  selector: 'app-project-video-call',
  imports: [],
  templateUrl: './project-video-call.component.html',
  styleUrl: './project-video-call.component.css',
})
export class ProjectVideoCallComponent {
  constructor(private ProjectVideoCallSocket: ProjectVideoCallSocket) {}
}
