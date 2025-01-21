import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { AdminNavbarComponent } from '../../../../shared/components/navbar/admin-navbar/admin-navbar.component';
import { UserComponentService } from './user.component.service';
import { UserListComponent } from './user-list/user-list.component';
import { User } from './user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [AdminNavbarComponent, UserListComponent, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(
    private userComponentService: UserComponentService,
    private destoryRef: DestroyRef
  ) {}

  usersData = signal<User[] | []>([]);
  keyword: string = '';
  limit: number = 5;
  skip: number = 0;

  ngOnInit(): void {
    this.loadusers();
  }

  reLoadUsers() {
    this.loadusers();
  }

  onNestSkip() {
    if(this.usersData().length) {
      this.skip += this.limit;
      this.loadusers();
    }
  }

  onPrevSkip() {
    if(this.skip >= this.limit) {
      this.skip -= this.limit;
      this.loadusers();
    }
  }

  loadusers() {
    const subscription = this.userComponentService
      .getUser(this.keyword, this.limit, this.skip)
      .subscribe({
        next: (data: User[]) => {
          this.usersData.set(data);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
