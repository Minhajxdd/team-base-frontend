import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  message = output<string>();

  input = '';

  onSendMessage() {
    this.message.emit(this.input);
    this.input = '';
  }
}
