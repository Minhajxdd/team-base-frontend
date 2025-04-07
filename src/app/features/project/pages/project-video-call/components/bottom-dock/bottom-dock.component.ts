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

  isAudioMuted = signal<boolean>(false);
  isVideoMuted = signal<boolean>(false);  

  toggleMuted() {
    this.isAudioMuted.set(!this.isAudioMuted());

    this._ProjectVideoCallMainService.muteAudio();
  }

  toggleAudio() {
    this.isVideoMuted.set(!this.isAudioMuted());

    this._ProjectVideoCallMainService.mutevideo();
  }

  leaveMeeting() {
    console.log(`Leaving Meeting`);

    this._ProjectVideoCallMainService.leaveRoom();

    window.location.href = '/';
  }
}
