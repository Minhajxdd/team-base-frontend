import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmojiCardComponent } from './emoji-card/emoji-card.component';

@Component({
  selector: 'app-input',
  imports: [FormsModule, EmojiCardComponent],
  templateUrl: './input.component.html',
})
export class InputComponent {
  message = output<string>();

  input = '';

  onSendMessage() {
    this.message.emit(this.input);
    this.input = '';
  }

  updateEmoji(emoji: any) {
    this.input += emoji;
  }
}
