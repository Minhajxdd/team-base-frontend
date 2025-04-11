import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Note } from '../../project-notes/project-notest.model';

@Injectable({
  providedIn: 'root',
})
export class QuickNotesService {
  constructor(private readonly _http: HttpClient) {}

  getNotes(projectId: string) {
    const limit = 3;
    return this._http.get<Note[]>(
      `${environment.back_end}/project/${projectId}/notes?limit=${limit}`,
      { withCredentials: true }
    );
  }
}
