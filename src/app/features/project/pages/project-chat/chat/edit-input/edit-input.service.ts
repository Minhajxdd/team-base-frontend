import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatModel } from '../chat.model';

@Injectable({
  providedIn: 'root',
})
export class EditInputService {
  private messageSource = new BehaviorSubject<ChatModel | null>(null);
  message$ = this.messageSource.asObservable();

  pushMessage(newMessage: ChatModel) {
    this.messageSource.next(newMessage);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
