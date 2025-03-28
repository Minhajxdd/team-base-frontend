import { Component, output } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-emoji-pop',
  imports: [PickerModule],
  templateUrl: './emoji-pop.component.html',
  styleUrl: './emoji-pop.component.css'
})
export class EmojiPopComponent {
  onEmoji = output();

  addEmoji(val: any) {
    this.onEmoji.emit(val.emoji.native);
  }
}
