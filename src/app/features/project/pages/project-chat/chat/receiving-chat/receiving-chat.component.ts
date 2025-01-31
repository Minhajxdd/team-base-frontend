import { Component, input } from '@angular/core';
import { ChatModel } from '../chat.model';
import { projectMember } from '../../../project-members/project-members-display/project-members.dispaly.model';

@Component({
  selector: 'app-receiving-chat',
  imports: [],
  templateUrl: './receiving-chat.component.html',
  styleUrl: './receiving-chat.component.css'
})
export class ReceivingChatComponent {
  chat = input.required<ChatModel>();
  member = input.required<projectMember | undefined>();
}
