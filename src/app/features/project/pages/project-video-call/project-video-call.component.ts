import { Component } from '@angular/core';
import { ProjectVideoCallSocket } from './service/project-video-call.socket.service';
import { UserFeedCardComponent } from "./components/user-feed-card/user-feed-card.component";

@Component({
  selector: 'app-project-video-call',
  imports: [UserFeedCardComponent],
  templateUrl: './project-video-call.component.html',
  styleUrl: './project-video-call.component.css',
})
export class ProjectVideoCallComponent {
  constructor(private ProjectVideoCallSocket: ProjectVideoCallSocket) {}
}
