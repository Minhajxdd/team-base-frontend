import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteData } from './notes-form.model';
import { environment } from '../../../../../../environments/environment';
import { Note } from '../project-notest.model';

@Injectable({
  providedIn: 'root',
})
export class NotesFormService {
  constructor(private readonly _http: HttpClient) {}

  addNote(data: NoteData, projectId: string) {
    return this._http.post<Note>(
      `${environment.back_end}/project/${projectId}/notes`,
      data,
      {
        withCredentials: true,
      }
    );
  }
}
