import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserProfileModel } from './profile-edit.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileEditService {
  constructor(private http: HttpClient) {}

  editProfile(profileData: any) {
    return this.http.patch(
      `${environment.back_end}/user-profile`,
      profileData,
      { withCredentials: true }
    );
  }

  getProfile() {
    return this.http.get<{data: {user: UserProfileModel} }>(`${environment.back_end}/user-profile`, {
      withCredentials: true,
    });
  }
}
