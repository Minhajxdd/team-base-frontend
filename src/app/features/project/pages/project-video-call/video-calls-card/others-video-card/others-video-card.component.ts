import { Component, ElementRef, input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-others-video-card',
  imports: [],
  templateUrl: './others-video-card.component.html',
  styleUrl: './others-video-card.component.css'
})
export class OthersVideoCardComponent implements OnInit{
  stream = input.required<MediaStream>();
  
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.addVideoStream(this.stream());
  }

  addVideoStream(stream: MediaStream) {
    const myVideo: HTMLVideoElement = this.renderer.createElement('video');
    this.renderer.setAttribute(myVideo, 'autoplay', 'true');
    this.renderer.setAttribute(myVideo, 'playsinline', 'true');
    
    myVideo.srcObject = stream;

    this.renderer.appendChild(this.videoContainer.nativeElement, myVideo);
  }
}
