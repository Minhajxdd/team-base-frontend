import { Component, OnDestroy, signal } from '@angular/core';
import { ProfileImageCardComponent } from './profile-card/profile-image-card/profile-image-card.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../shared/components/navbar/navbar.model';
import { selectUser } from '../../../shared/store/user/user.selector';
import { UserNavbarComponent } from "../../../shared/components/navbar/user-navbar/user-navbar.component";

@Component({
  selector: 'app-profile-edit',
  imports: [ProfileImageCardComponent, UserNavbarComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent implements OnDestroy {
  user$!: Observable<any>;

  subscription1$!: Subscription;

  user = signal<User | null>(null);

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);

    this.subscription1$ = this.user$.subscribe((data) => {
      this.user.set(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
  }
}
