import { Component, DestroyRef } from '@angular/core';
import { Note } from './project-notest.model';
import { OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { NotesFormComponent } from './notes-form-component/notes-form-component.component';
import { ProjectNotesService } from './project-notes.service';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../store/project.selector';

@Component({
  selector: 'app-project-notes',
  imports: [CommonModule, DatePipe, NgClass],
  templateUrl: './project-notes.component.html',
  styleUrl: './project-notes.component.css',
})
export class ProjectNotesComponent {
  notes: Note[] = [];
  projectId: string = '';

  overlayRef!: OverlayRef;

  colorClassMap: { [key: string]: string } = {
    '#FBBF24': 'border-indigo-400',
    '#34D399': 'border-pink-400',
    '#38BDF8': 'border-amber-400',
    '#f87171': 'border-cyan-400',
    '#fb923c': 'border-blue-400',
    '#2dd4bf': 'border-rose-400',
    '#60a5fa': 'border-amber-400',
  };

  constructor(
    private overlay: Overlay,
    private readonly _projectNotesService: ProjectNotesService,
    private store: Store,
    private readonly _destroyRef: DestroyRef
  ) {

    this.getProjectId();
    this.fetchNotes();
  }

  getProjectId() {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  fetchNotes() {
    const subscription = this._projectNotesService.getNotes(this.projectId)
      .subscribe({
        next: (data) => {
          this.notes = data;
        }
      });
    
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  openForm(existingNote?: Note): void {
    
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'custom-overlay-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const portal = new ComponentPortal(NotesFormComponent);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.close.subscribe(() => this.overlayRef.dispose());
    componentRef.instance.save.subscribe((noteData: Note) => {
      this.notes.push(noteData);
      this.overlayRef.dispose();
    });
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
  }

  deleteNote(noteId: string): void {
    const subscription = this._projectNotesService.deleteNotes(this.projectId, noteId)
    .subscribe({
      complete: () => {
        this.notes = this.notes.filter((note) => note._id !== noteId);
      }
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
