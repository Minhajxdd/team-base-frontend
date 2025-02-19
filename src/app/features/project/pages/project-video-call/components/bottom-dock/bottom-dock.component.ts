import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ProjectVideoCallMainService } from '../../service/project-video-call.main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-dock',
  imports: [NgClass],
  templateUrl: './bottom-dock.component.html',
  styleUrl: './bottom-dock.component.css',
})
export class BottomDockComponent {
  constructor(
    private _ProjectVideoCallMainService: ProjectVideoCallMainService,
    private router: Router
  ) {}

  isMuted = signal<boolean>(false);

  toggleMuted() {
    this.isMuted.set(!this.isMuted());

    this._ProjectVideoCallMainService.muteAudio();
  }

  leaveMeeting() {
    console.log(`Leaving Meeting`);

    this._ProjectVideoCallMainService.leaveRoom();

    this.router.navigate(['']);
  }
}
