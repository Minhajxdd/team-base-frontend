import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ReceivingChatComponent } from './receiving-chat/receiving-chat.component';
import { InputComponent } from './input/input.component';
import { ChatSocketService } from '../chat.socket.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../../shared/store/user/user.selector';
import { ChatModel } from './chat.model';
import { User } from '../../../../../shared/store/user/user.model';
import {
  selectProjectId,
  selectProjectRole,
} from '../../../store/project.selector';
import { MembersServices } from '../members/members.services';
import { projectMember } from '../../project-members/project-members-display/project-members.dispaly.model';
import { ChatService } from './chat.service';
import { EditInputComponent } from './edit-input/edit-input.component';
import { EditInputService } from './edit-input/edit-input.service';
import { DeleteInputComponent } from './delete-input/delete-input.component';
import { DeleteInputService } from './delete-input/delete-input.service';
import { UuidUtils } from '../../../../../shared/utils/uuid.utils';

@Component({
  selector: 'app-chat',
  imports: [
    UserChatComponent,
    ReceivingChatComponent,
    InputComponent,
    EditInputComponent,
    DeleteInputComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  private membersServices = inject(MembersServices);
  private chatService = inject(ChatService);
  private deleteInputService = inject(DeleteInputService);

  projectId!: string;
  skip = 0;

  members!: projectMember[];

  constructor(
    private chatSocketService: ChatSocketService,
    private destoryRef: DestroyRef,
    private store: Store,
    private editInputService: EditInputService,
    private uuidUtils: UuidUtils
  ) {
    const subscription = this.store.select(selectUser).subscribe((data) => {
      this.user = data;
    });
    const subscription1 = this.store
      .select(selectProjectRole)
      .subscribe((data) => {
        if (data) this.role = data;
      });

    const subscription2 = this.membersServices.projectMembers$.subscribe(
      (data) => {
        this.members = data;
      }
    );

    const subscription3 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    const subscription4 = this.chatService
      .getChat(this.projectId, this.skip)
      .subscribe({
        next: (data) => {
          this.messages = data;
        },
      });

    const subscription5 = this.chatSocketService
      .on('message')
      .subscribe((data: ChatModel) => {
        this.messages.push(data);
        this.scrollChatDiv();
      });

    const subscription6 = this.chatSocketService
      .on('edit-message')
      .subscribe((data: ChatModel) => {
        this.messages = this.messages.map((chat: ChatModel) => {
          return chat.uuid === data.uuid ? { ...chat, text: data.text } : chat;
        });
      });

    const subscription7 = this.chatSocketService
      .on('delete-message')
      .subscribe((data: string) => {
        this.messages = this.messages.filter((chat) => {
          return chat.uuid != data;
        });
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      subscription4.unsubscribe();
      subscription5.unsubscribe();
      subscription6.unsubscribe();
      subscription7.unsubscribe();
    });
  }

  onRemoveUnrefreshed(data: ChatModel | null) {
    this.messages = this.messages.filter((chat) => {
      return chat != data;
    });
  }

  ngAfterViewInit() {
    const timer = setTimeout(() => {
      this.scrollChatDiv();
    }, 100);

    this.destoryRef.onDestroy(() => {
      clearTimeout(timer);
    });
  }

  user!: User;
  role!: string;

  messages: ChatModel[] = [];

  onSendMessage(message: string) {
    const uuid = this.uuidUtils.generateUUID();
    this.chatSocketService.emit('message', { text: message, uuid });
    this.scrollChatDiv();
  }

  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;

  scrollChatDiv() {
    this.scrollableDiv.nativeElement.scrollTop =
      this.scrollableDiv.nativeElement.scrollHeight;
  }

  isNewChatFetching = signal(false);

  onFetchData() {
    this.skip += 10;
    this.isNewChatFetching.set(true);

    const subscription = this.chatService
      .getChat(this.projectId, this.skip)
      .subscribe({
        next: (data) => {
          this.messages = [...data, ...this.messages];
        },
        complete: () => {
          this.isNewChatFetching.set(false);
        },
      });
    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onEditTask(event: ChatModel) {
    this.editInputService.pushMessage(event);
  }

  onDeleteMessage(event: ChatModel) {
    this.deleteInputService.pushMessage(event);
  }

  getProjectMemberById(memberId: string): projectMember | undefined {
    return this.members.find((member) => member.userId._id === memberId);
  }
}
