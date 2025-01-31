import { Component, input } from '@angular/core';
import { ChatModel } from '../chat.model';

@Component({
  selector: 'app-user-chat',
  imports: [],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css',
})
export class UserChatComponent {
  chat = input.required<ChatModel>();
  profile = input.required<string>();
  role = input.required<string>();
}
