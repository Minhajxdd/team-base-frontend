import { Component, signal } from '@angular/core';
import { AddTaskFormComponent } from "./add-task-form/add-task-form.component";

@Component({
  selector: 'app-header',
  imports: [AddTaskFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isFormVisible = signal(false);

  onFormOpen() {
    this.isFormVisible.set(true);
  }

  onFormClose(value: boolean) {
    this.isFormVisible.set(value);
  } 
}
