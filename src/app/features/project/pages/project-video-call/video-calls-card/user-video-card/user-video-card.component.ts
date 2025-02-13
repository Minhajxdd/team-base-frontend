import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { VCService } from '../../vc.service';

@Component({
  selector: 'app-user-video-card',
  imports: [],
  templateUrl: './user-video-card.component.html',
  styleUrl: './user-video-card.component.css'
})
export class UserVideoCardComponent {
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;

  constructor(private renderer: Renderer2, private readonly _vCService: VCService) {
    this.getMedia()
   }

  async getMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      this._vCService.handleUserStream(stream);

      this.addVideoStream(stream);

    } catch (err) {
      console.log(err);
    }
  }

  addVideoStream(stream: MediaStream) {
    const myVideo: HTMLVideoElement = this.renderer.createElement('video');
    this.renderer.setAttribute(myVideo, 'autoplay', 'true');
    this.renderer.setAttribute(myVideo, 'playsinline', 'true');
    
    myVideo.srcObject = stream;

    this.renderer.appendChild(this.videoContainer.nativeElement, myVideo);
  }

}
