import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Note } from '../project-notest.model';
import { NoteData } from './notes-form.model';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../store/project.selector';
import { NotesFormService } from './notes-form-service';

@Component({
  selector: 'app-notes-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notes-form-component.component.html',
  styleUrl: './notes-form-component.component.css',
})
export class NotesFormComponent {
  @Input() note!: Note;

  close = output();
  save = output<Note>();

  onCancel(): void {
    this.noteForm.reset();

    this.close.emit();
  }

  noteForm: FormGroup;
  projectId: string = '';
  isSubmitting: boolean = false;

  colors = [
    { id: 'amber', name: 'Golden Amber', hex: '#FBBF24' },
    { id: 'mint', name: 'Fresh Mint', hex: '#34D399' },
    { id: 'sky', name: 'Clear Sky', hex: '#38BDF8' },
    { id: 'rose', name: 'Soft Rose', hex: '#f87171' },
    { id: 'citrus', name: 'Warm Citrus', hex: '#fb923c' },
    { id: 'aqua', name: 'Calm Teal', hex: '#2dd4bf' },
    { id: 'wave', name: 'Ocean Wave', hex: '#60a5fa' },
  ];
  

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private _destoryRef: DestroyRef,
    private _notesFormService: NotesFormService
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      color: ['', Validators.required],
    });

    this.getProjectId();
  }

  getProjectId() {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.noteForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const newNote: NoteData = {
        title: this.noteForm.value.title,
        description: this.noteForm.value.description,
        color: this.noteForm.value.color,
      };

      this.isSubmitting = true;

      const subscription = this._notesFormService.addNote(newNote, this.projectId)
      .subscribe({
        next: (data) => {
          console.log(`data received from form`);
          console.log(data);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });

      this._destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      })

      this.noteForm.reset();
    } else {
      Object.keys(this.noteForm.controls).forEach((key) => {
        const control = this.noteForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
