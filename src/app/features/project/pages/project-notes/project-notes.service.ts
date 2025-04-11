import { HttpClient } from '@angular/common/http';
import { Injectable, runInInjectionContext } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Note } from './project-notest.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectNotesService {
  constructor(private readonly _http: HttpClient) {}

  getNotes(projectId: string) {
    return this._http.get<Note[]>(
      `${environment.back_end}/project/${projectId}/notes`,
      { withCredentials: true }
    );
  }

  deleteNotes(projectId: string, noteId: string) {
    return this._http.delete(
      `${environment.back_end}/project/${projectId}/notes/${noteId}`,
      { withCredentials: true }
    );
  }
}
