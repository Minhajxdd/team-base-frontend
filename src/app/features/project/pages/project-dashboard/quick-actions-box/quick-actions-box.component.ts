import { Component, DestroyRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../store/project.selector';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-actions-box',
  imports: [RouterLink],
  templateUrl: './quick-actions-box.component.html',
  styleUrl: './quick-actions-box.component.css',
})
export class QuickActionsBoxComponent {
  projectId!: string ;

  constructor(
    private readonly store: Store,
    private readonly destoryRef: DestroyRef
  ) {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
