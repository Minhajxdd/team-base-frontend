import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.js';
import { ChatModel } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);

  getChat(projectId: string, skip: number = 0) {
    return this.http.get<ChatModel[]>(
      `${environment.back_end}/chat/${projectId}?skip=${skip}`,
      { withCredentials: true }
    );
  }
 

}
