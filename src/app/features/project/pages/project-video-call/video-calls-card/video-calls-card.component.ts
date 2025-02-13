import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserVideoCardComponent } from "./user-video-card/user-video-card.component";
import { VcStreamService } from '../vs-stream.service';
import { OthersVideoCardComponent } from "./others-video-card/others-video-card.component";

@Component({
  selector: 'app-video-calls-card',
  imports: [UserVideoCardComponent, OthersVideoCardComponent],
  templateUrl: './video-calls-card.component.html',
  styleUrl: './video-calls-card.component.css'
})
export class VideoCallsCardComponent implements AfterViewInit{
  @ViewChild('videosContainer') videosContainer!: ElementRef;
  
  streams: MediaStream[] = [];

  constructor(private _vcStreamService: VcStreamService) { 
    
    const subscription = this._vcStreamService.getStream()
    .subscribe({
      next: (data) => {
        this.streams = data;
        console.log(`data from subscrber`);
        console.log(data);
      }
    })
    

  }

  ngAfterViewInit(): void {
    // this.addStream();  
  }

  ngOnInit(): void { }

  addStream(stream: MediaStream) {
    
  }

}
