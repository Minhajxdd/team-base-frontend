import { Component, DestroyRef, input, OnInit } from '@angular/core';
import { projectMember } from '../project-members.dispaly.model';
import { RoleChangeFormComponent } from './role-change-form/role-change-form.component';
import { Store } from '@ngrx/store';
import { selectProjectRole } from '../../../../store/project.selector';

@Component({
  selector: 'app-profile-card',
  imports: [RoleChangeFormComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
})
export class ProfileCardComponent implements OnInit {
  member = input.required<projectMember>();

  isEditFormVisible = false;

  projectRole: string | null = null;

  constructor(private store: Store, private destoryRef: DestroyRef) {}

  ngOnInit(): void {
    const subscription = this.store
      .select(selectProjectRole)
      .subscribe((data) => {
        this.projectRole = data;
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onOpenForm() {
    this.isEditFormVisible = true;
  }

  onCloseForm(event: boolean) {
    this.isEditFormVisible = event;
  }
}
