import { Component, input } from '@angular/core';
import { projectMember } from '../project-members.dispaly.model';
import { RoleChangeFormComponent } from './role-change-form/role-change-form.component';

@Component({
  selector: 'app-profile-card',
  imports: [RoleChangeFormComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
})
export class ProfileCardComponent {
  member = input.required<projectMember>();

  isEditFormVisible = false;

  onOpenForm() {
    this.isEditFormVisible = true;
  }

  onCloseForm(event: boolean) {
    this.isEditFormVisible = event;
  }
}
