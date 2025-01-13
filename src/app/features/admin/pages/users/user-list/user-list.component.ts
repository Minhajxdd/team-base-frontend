import { Component, input, OnInit, signal } from '@angular/core';
import { User } from '../user.model';
import { AdminUserService } from '../admin.users.service';

@Component({
  selector: '[app-user-list]',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  constructor(private adminUserService: AdminUserService) {}

  user = input.required<User>();

  isBlocked = signal<boolean | null>(null);

  ngOnInit(): void {
    this.isBlocked.set(this.user().isBlocked);
  }

  onToggleBlock() {
    this.adminUserService.updateUserBlockStatus(this.user()._id).subscribe({
      complete: () => {
        this.isBlocked.set(!this.isBlocked());
      },
    });
  }
}
