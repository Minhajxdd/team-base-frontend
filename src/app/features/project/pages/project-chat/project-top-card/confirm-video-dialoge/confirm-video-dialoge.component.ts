import { Component, DestroyRef, ElementRef, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../store/project.selector';

@Component({
  selector: 'app-confirm-video-dialoge',
  imports: [RouterLink],
  templateUrl: './confirm-video-dialoge.component.html',
  styleUrl: './confirm-video-dialoge.component.css',
})
export class ConfirmVideoDialogeComponent {
  close = output();
  projectId!: string;

  constructor(
    private readonly _ele: ElementRef,
    private readonly store: Store,
    private readonly destroyRef: DestroyRef
  ) {
    const subscription = this.store.select(selectProjectId)
    .subscribe((data) => {
      this.projectId = data;
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onClose() {
    this.close.emit();
    this._ele.nativeElement.remove();
  }
}
