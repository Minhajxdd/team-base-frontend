import { AfterViewInit, Component, DestroyRef, OnInit } from '@angular/core';
import { ChatSocketService } from './chat.socket.service';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../store/project.selector';
import { MembersComponent } from './members/members.component';
import { ChatComponent } from './chat/chat.component';
import { selectUser } from '../../../../shared/store/user/user.selector';
import { ChatUserProfileComponent } from './chat-user-profile/chat-user-profile.component';
import { ProjectTopCardComponent } from './project-top-card/project-top-card.component';

@Component({
  selector: 'app-project-chat',
  imports: [
    MembersComponent,
    ChatComponent,
    ChatUserProfileComponent,
    ProjectTopCardComponent,
  ],
  templateUrl: './project-chat.component.html',
  styleUrl: './project-chat.component.css',
})
export class ProjectChatComponent implements OnInit, AfterViewInit {
  projectId!: string;

  constructor(
    private chatSocketService: ChatSocketService,
    private store: Store,
    private destoryRef: DestroyRef
  ) {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((projectId) => {
        this.projectId = projectId;
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    const timer = setTimeout(() => {
      this.chatSocketService.connect();
    }, 500);

    this.destoryRef.onDestroy(() => {
      clearTimeout(timer);
    })
  }

  ngOnInit(): void {

    this.chatSocketService.emit('enterRoom', {
      roomId: this.projectId,
    });
  }
}
