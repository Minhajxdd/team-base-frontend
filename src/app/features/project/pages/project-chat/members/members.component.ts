import {
  Component,
  DestroyRef,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MembersCardComponent } from './members-card/members-card.component';
import { MembersServices } from './members.services';
import { projectMember } from '../../project-members/project-members-display/project-members.dispaly.model';
import { SmallSpninnerComponent } from '../../../../../shared/components/loading-screens/small-spninner/small-spninner.component';
import { ChatSocketService } from '../chat.socket.service';

@Component({
  selector: 'app-members',
  imports: [MembersCardComponent, SmallSpninnerComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit, OnDestroy {
  projectId = input.required<string>();

  constructor(
    private membersServices: MembersServices,
    private destoryRef: DestroyRef,
    private chatSocketService: ChatSocketService
  ) {}

  ngOnDestroy(): void {
    this.chatSocketService.disconnect();
  }

  isLoading = signal(true);
  projectMembers!: projectMember[];
  onlineMembers!: Set<string>;

  ngOnInit(): void {
    const subscription = this.chatSocketService.on('userList').subscribe({
      next: (data: { users: string[] }) => {
        this.onlineMembers = new Set(data.users);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading.set(true);
    
    this.membersServices.FetchProjectMembers(this.projectId());

    const subscription = this.membersServices.projectMembers$.subscribe({
      next: (data) => {
        this.projectMembers = data;
        this.isLoading.set(false);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  isMemberOnline(userId: string) {
    if (this.onlineMembers) return this.onlineMembers.has(userId);
    else return false;
  }
}
