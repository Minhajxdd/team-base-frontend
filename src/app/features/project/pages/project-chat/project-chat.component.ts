import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ChatSocketService } from './chat.socket.service';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../store/project.selector';
import { MembersComponent } from "./members/members.component";

@Component({
  selector: 'app-project-chat',
  imports: [MembersComponent],
  templateUrl: './project-chat.component.html',
  styleUrl: './project-chat.component.css',
})
export class ProjectChatComponent implements OnInit {
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

  ngOnInit(): void {
    this.chatSocketService.emit('enterRoom', {
      roomId: this.projectId,
    });
  }
}
