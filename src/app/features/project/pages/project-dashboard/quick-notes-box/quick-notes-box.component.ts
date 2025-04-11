import { Component, DestroyRef } from '@angular/core';
import { QuickNotesService } from './quick-notes.service';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../store/project.selector';
import { Note } from '../../project-notes/project-notest.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-notes-box',
  imports: [RouterLink],
  templateUrl: './quick-notes-box.component.html',
  styleUrl: './quick-notes-box.component.css',
})
export class QuickNotesBoxComponent {
  notes: Note[] = [];
  projectId: string = '';

  constructor(
    private readonly _quickNotesService: QuickNotesService,
    private store: Store,
    private _destoryRef: DestroyRef
  ) {
    const subscription = this.store.select(selectProjectId)
    .subscribe((data) => {
      this.projectId = data;
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewInit() {
    const subscription = this._quickNotesService.getNotes(this.projectId)
    .subscribe(({
      next: (data) => {
        this.notes = data;
      }
    }))
  }
}
