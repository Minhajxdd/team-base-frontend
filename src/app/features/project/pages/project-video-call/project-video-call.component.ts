import { Component, DestroyRef } from '@angular/core';
import { UserFeedCardComponent } from './components/user-feed-card/user-feed-card.component';
import { ProjectVideoCallMainService } from './service/project-video-call.main.service';
import { ActiveUserFeed } from './models/active-user-feed.model';
import { BottomDockComponent } from "./components/bottom-dock/bottom-dock.component";

@Component({
  selector: 'app-project-video-call',
  imports: [UserFeedCardComponent, BottomDockComponent],
  templateUrl: './project-video-call.component.html',
  styleUrl: './project-video-call.component.css',
})
export class ProjectVideoCallComponent {
  usersFeeds: ActiveUserFeed[] = [];

  constructor(
    private _ProjectVideoCallMainService: ProjectVideoCallMainService,
    private destoryRef: DestroyRef
  ) {
    const subscription =
      this._ProjectVideoCallMainService.activeUserFeed$.subscribe({
        next: (data) => {
          if (data) {
            this.usersFeeds = data;
            console.log('userFeed')
            console.log(this.usersFeeds);
            console.log('userFeed')
          }
        },
      });
  }
}
