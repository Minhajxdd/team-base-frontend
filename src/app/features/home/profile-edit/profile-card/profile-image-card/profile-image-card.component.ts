import { Component, input } from '@angular/core';
import { ProfileUpdateFormComponent } from "./profile-update-form/profile-update-form.component";

@Component({
  selector: 'app-profile-image-card',
  imports: [ProfileUpdateFormComponent],
  templateUrl: './profile-image-card.component.html',
  styleUrl: './profile-image-card.component.css',
})
export class ProfileImageCardComponent {
  imageUrl = input.required<string | null | undefined>();
}
