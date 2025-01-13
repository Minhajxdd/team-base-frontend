import { Component, OnInit, signal } from '@angular/core';
import { AdminNavbarComponent } from '../../../../shared/components/navbar/admin-navbar/admin-navbar.component';
import { UserComponentService } from './user.component.service';
import { UserListComponent } from './user-list/user-list.component';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  imports: [AdminNavbarComponent, UserListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private userComponentService: UserComponentService) {}

  usersData = signal<User[] | []>([]);

  ngOnInit(): void {
    this.userComponentService.getUser().subscribe({
      next: (data: User[]) => {
        this.usersData.set(data);
      },
    });
  }
}
