import {
  Component,
  computed,
  DestroyRef,
  effect,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProjectMembersDisplayComponentService } from './project-members.display.service';
import { LoadingSpinnerComponent } from '../../../../../shared/components/loading-screens/loading-spinner/loading-spinner.component';
import { SomethingWentWrongComponent } from '../../../../../shared/components/error-screens/something-went-wrong/something-went-wrong.component';
import { projectMember } from './project-members.dispaly.model';
import { ProfileNoMembersComponent } from './profile-no-members/profile-no-members.component';
import { ProjectMembersShared } from '../project-members.shared';

@Component({
  selector: 'app-project-members-display',
  imports: [
    ProfileCardComponent,
    LoadingSpinnerComponent,
    SomethingWentWrongComponent,
    ProfileNoMembersComponent,
  ],
  templateUrl: './project-members-display.component.html',
  styleUrl: './project-members-display.component.css',
})
export class ProjectMembersDisplayComponent implements OnInit {
  role = input.required<string>();
  projectId = input.required<string>();

  isLoading = signal<boolean>(true);
  isLoadingError = signal<boolean>(false);

  teamMembers: projectMember[] = [];

  constructor(
    private readonly projectMembersDisplayComponentService: ProjectMembersDisplayComponentService,
    private readonly destroyRef: DestroyRef,
    private readonly projectMembersShared: ProjectMembersShared
  ) {
    effect(() => {
      this.fetchMembersdata();
    });
  }

  ngOnInit(): void {
    const subscription = this.projectMembersShared.currentMessage.subscribe(
      () => {
        this.fetchMembersdata();
      }
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  fetchMembersdata() {
    this.isLoading.set(true);
    const subscription = this.projectMembersDisplayComponentService
      .getProjectMembers(this.projectId(), this.role())
      .subscribe({
        next: (data) => {
          this.teamMembers = data;
        },
        complete: () => {
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoadingError.set(true);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
