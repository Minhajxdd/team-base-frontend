import { Component, DestroyRef, inject } from '@angular/core';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ReceivingChatComponent } from './receiving-chat/receiving-chat.component';
import { InputComponent } from './input/input.component';
import { ChatSocketService } from '../chat.socket.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../../shared/store/user/user.selector';
import { ChatModel } from './chat.model';
import { User } from '../../../../../shared/store/user/user.model';
import { selectProjectRole } from '../../../store/project.selector';
import { MembersServices } from '../members/members.services';
import { projectMember } from '../../project-members/project-members-display/project-members.dispaly.model';

@Component({
  selector: 'app-chat',
  imports: [UserChatComponent, ReceivingChatComponent, InputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  private membersServices = inject(MembersServices);

  members!: projectMember[];

  constructor(
    private chatSocketService: ChatSocketService,
    private destoryRef: DestroyRef,
    private store: Store
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

    const subscription3 = this.chatSocketService
      .on('message')
      .subscribe((data: ChatModel) => {
        this.messages.push(data)
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    });
  }

  user!: User;
  role!: string;

  messages: ChatModel[] = [
    {
      senderId: '678a14d4d96aa61716f45f64',
      text: 'fd',
      time: '11:14:3e PM',
    },
    {
      senderId: '678e8d0980716bac133cdba0',
      text: 'Hi There',
      time: '12:35:3d PM',
    },
    {
      senderId: '678f3d6dcb15516c96de58b1',
      text: 'done randomly',
      time: '12:35:c7 PM',
    },
    {
      senderId: '678a14d4d96aa61716f45f64',
      text: 'fd',
      time: '12:35:b7 PM',
    },
    {
      senderId: '678e8d0980716bac133cdba0',
      text: 'Hi There',
      time: '12:35:3 PM',
    },
    {
      senderId: '678f3d6dcb15516c96de58b1',
      text: 'done randomly',
      time: '12:35:3a PM',
    },
  ];

  onSendMessage(message: string) {
    this.chatSocketService.emit('message', { text: message });
  }

  getProjectMemberById(memberId: string): projectMember | undefined {
    return this.members.find((member) => member.userId._id === memberId);
  }
}
