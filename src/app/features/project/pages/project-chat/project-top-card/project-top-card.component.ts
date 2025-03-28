import { Component, signal } from '@angular/core';
import { ConfirmVideoDialogeComponent } from "./confirm-video-dialoge/confirm-video-dialoge.component";

@Component({
  selector: 'app-project-top-card',
  imports: [ConfirmVideoDialogeComponent],
  templateUrl: './project-top-card.component.html',
  styleUrl: './project-top-card.component.css'
})
export class ProjectTopCardComponent {
  showVideoCallPopup = signal<boolean>(false);

  onShowVideoCallPopup() {
    this.showVideoCallPopup.set(true);
  }

  onCloseVideoCallPopup() {
    this.showVideoCallPopup.set(false);
  }

}
