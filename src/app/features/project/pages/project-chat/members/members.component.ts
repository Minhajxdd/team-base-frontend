import { Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { MembersCardComponent } from './members-card/members-card.component';
import { MembersServices } from './members.services';
import { projectMember } from '../../project-members/project-members-display/project-members.dispaly.model';
import { SmallSpninnerComponent } from "../../../../../shared/components/loading-screens/small-spninner/small-spninner.component";

@Component({
  selector: 'app-members',
  imports: [MembersCardComponent, SmallSpninnerComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit {
  projectId = input.required<string>();

  constructor(
    private membersServices: MembersServices,
    private destoryRef: DestroyRef
  ) {}

  isLoading = signal(true);
  projectMembers!: projectMember[];

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.membersServices
      .FetchProjectMembers(this.projectId())
      .subscribe({
        next: (data) => {
          this.projectMembers = data;
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
