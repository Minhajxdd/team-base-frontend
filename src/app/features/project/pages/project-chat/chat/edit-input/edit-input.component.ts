import { Component, DestroyRef, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { EditInputService } from './edit-input.service';
import { Subscription } from 'rxjs';
import { ChatModel } from '../chat.model';
import { FormsModule } from '@angular/forms';
import { ChatSocketService } from '../../chat.socket.service';

@Component({
  selector: 'app-edit-input',
  imports: [NgClass, FormsModule],
  templateUrl: './edit-input.component.html',
  styleUrl: './edit-input.component.css',
})
export class EditInputComponent {
  constructor(
    private editInputService: EditInputService,
    private destoryRef: DestroyRef,
    private chatSocketService: ChatSocketService
  ) {}

  messages = signal<ChatModel | null>(null);
  show = signal<boolean>(true);
  value: string | undefined = '';

  ngOnInit() {
    const subscription = this.editInputService.message$.subscribe((msgs) => {
      this.messages.set(msgs);
      this.value = this.messages()?.text;
      this.show.set(!this.show());
    });
    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  clearMessages() {
    this.editInputService.clearMessage();
  }

  onClose() {
    this.editInputService.clearMessage();
  }

  onSubmit() {
    
    const data = {
      text: this.value,
      chatId: this.messages()?._id,
      uuid: this.messages()?.uuid,
    };
    this.chatSocketService.emit('edit-message', data);

    this.onClose();
  }
}
