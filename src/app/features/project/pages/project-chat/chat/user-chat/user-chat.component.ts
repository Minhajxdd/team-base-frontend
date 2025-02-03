import { Component, input, output } from '@angular/core';
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

  editTask = output<ChatModel>();
  deleteMessage = output<ChatModel>();

  oneEditTask() {
    this.editTask.emit(this.chat());
  }

  onDeleteMessage() {
    this.deleteMessage.emit(this.chat());
    console.log(this.chat()._id);console.log('from user essage componetns')
   }
}
