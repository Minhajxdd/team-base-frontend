import { Component, DestroyRef } from '@angular/core';
import { User } from '../../../../../shared/store/user/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../../shared/store/user/user.selector';
import { selectProjectRole } from '../../../store/project.selector';

@Component({
  selector: 'app-chat-user-profile',
  imports: [],
  templateUrl: './chat-user-profile.component.html',
  styleUrl: './chat-user-profile.component.css',
})
export class ChatUserProfileComponent {
  user!: User;
  role!: string;

  constructor(private store: Store, private destoryRef: DestroyRef) {
    const subscription1 = this.store.select(selectUser).subscribe((data) => {
      this.user = data;
    });

    const subscription2 = this.store.select(selectProjectRole)
    .subscribe((data) => {
      if(data)
        this.role = data;
    })

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
    });
  }
}
