import { Component } from '@angular/core';
import { ProjectVideoCallMainService } from '../../service/project-video-call.main.service';

@Component({
  selector: 'app-user-feed-card',
  imports: [],
  templateUrl: './user-feed-card.component.html',
  styleUrl: './user-feed-card.component.css'
})
export class UserFeedCardComponent {
  constructor(private _ProjectVideoCallMainService: ProjectVideoCallMainService) {
    this._ProjectVideoCallMainService.joinRoom('hello', 'world');
  }
}
