import { Component, DestroyRef, signal } from '@angular/core';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { Store } from '@ngrx/store';
import { selectProjectRole } from '../../../store/project.selector';

@Component({
  selector: 'app-header',
  imports: [AddTaskFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  role!: string;

  constructor(private store: Store, private destroyRef: DestroyRef) {
    const subscription = this.store.select(selectProjectRole).subscribe((data) => {
      if(data)
        this.role = data;
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  isFormVisible = signal(false);

  onFormOpen() {
    this.isFormVisible.set(true);
  }

  onFormClose(value: boolean) {
    this.isFormVisible.set(value);
  }
}
