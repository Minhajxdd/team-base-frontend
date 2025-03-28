import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateFormService {
  constructor(private readonly http: HttpClient) {}

  uploadProfile(file: File) {
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

  removeProfile() {
    return this.http.delete(`${environment.back_end}/user-profile/image`, {
      withCredentials: true,
    });
  }
}
