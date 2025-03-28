import { Component, output, signal } from '@angular/core';

import { EmojiPopComponent } from './emoji-pop/emoji-pop.component';

@Component({
  selector: 'app-emoji-card',
  imports: [EmojiPopComponent],
  templateUrl: './emoji-card.component.html',
  styleUrl: './emoji-card.component.css',
})
export class EmojiCardComponent {
  onEmoji = output();
  
  showEmoji = signal<boolean>(false);

  onEmojiEvent(emoji: any) {
    this.onEmoji.emit(emoji);
  }

  onToggleEmoji() {
    this.showEmoji.set(!this.showEmoji())
  }

}
