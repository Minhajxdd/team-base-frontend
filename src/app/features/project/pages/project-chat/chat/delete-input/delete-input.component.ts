import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { DeleteInputService } from './delete-input.service';
import { NgClass } from '@angular/common';
import { ChatSocketService } from '../../chat.socket.service';
import { ChatModel } from '../chat.model';

@Component({
  selector: 'app-delete-input',
  imports: [NgClass],
  templateUrl: './delete-input.component.html',
  styleUrl: './delete-input.component.css',
})
export class DeleteInputComponent implements OnInit {
  private deleteInputService = inject(DeleteInputService);
  private destoryRef = inject(DestroyRef);
  private chatSocketService = inject(ChatSocketService);

  chat = signal<ChatModel | null>(null);
  show = signal<boolean>(true);
  

  ngOnInit(): void {
    const subscription = this.deleteInputService.message$.subscribe((msgs) => {
      this.chat.set(msgs);
      this.show.set(!this.show());
      console.log(msgs)
    });
    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClose() {
    this.deleteInputService.clearMessage();
  }

  removeUnrefreshed = output<ChatModel | null>();

  onSubmit() {
    const data = {
      chatId: this.chat(),
    };
    this.chatSocketService.emit('delete-message', data);

    if(!this.chat()?._id) {
      this.removeUnrefreshed.emit(this.chat());
    }

    this.onClose();
  }
}
