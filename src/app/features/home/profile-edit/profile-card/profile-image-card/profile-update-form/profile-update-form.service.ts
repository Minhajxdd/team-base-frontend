import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateFormService {
  constructor(private readonly http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('profile', file);

    return this.http.post(
      `${environment.back_end}/user-profile/image`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
}
