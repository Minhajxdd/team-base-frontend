import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.development';
import { MemberResponseModel } from './add-task-form.model';

@Injectable({
  providedIn: 'root',
})
export class AddTaskFormService {
  constructor(private http: HttpClient) {}
  addTask(
    projectId: string,
    title: string,
    description: string,
    assignedTo: string,
    priority: number,
    deadline: Date,
    status: string = 'todo'
  ) {
    return this.http.post(
      `${environment.back_end}/project/${projectId}/tasks`,
      {
        title,
        description,
        status,
        assignedTo,
        priority,
        deadline,
      },
      {
        withCredentials: true,
      }
    );
  }

  getMembers(projectId: string) {
    return this.http.get<MemberResponseModel[]>(
      `${environment.back_end}/project/${projectId}/members/details`,
      { withCredentials: true }
    );
  }
}
