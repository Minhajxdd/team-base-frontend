import { Component, input } from '@angular/core';
import { projectMember } from '../../../project-members/project-members-display/project-members.dispaly.model';

@Component({
  selector: 'app-members-card',
  imports: [],
  templateUrl: './members-card.component.html',
  styleUrl: './members-card.component.css',
})
export class MembersCardComponent {
  member = input.required<projectMember>();
  isOnline = input<boolean>(false);
}
