import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-user-dialoge',
  imports: [],
  templateUrl: './delete-user-dialoge.component.html',
  styleUrl: './delete-user-dialoge.component.css'
})
export class DeleteUserDialogeComponent {
  isVisible = input.required<boolean>();
  closeDialoge = output<boolean>();

  removeUser = output();

  onCloseDialoge() {
    this.closeDialoge.emit(false);
  }

  onRemoveUser() {
    this.removeUser.emit();
  }
}
