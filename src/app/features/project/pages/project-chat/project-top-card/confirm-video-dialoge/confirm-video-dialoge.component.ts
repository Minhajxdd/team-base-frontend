import { Component, ElementRef, output } from '@angular/core';

@Component({
  selector: 'app-confirm-video-dialoge',
  imports: [],
  templateUrl: './confirm-video-dialoge.component.html',
  styleUrl: './confirm-video-dialoge.component.css',
})
export class ConfirmVideoDialogeComponent {
  close = output();
  
  constructor(private readonly _ele: ElementRef) {}

  onClose() {
    this.close.emit();
    this._ele.nativeElement.remove();
  }

}
