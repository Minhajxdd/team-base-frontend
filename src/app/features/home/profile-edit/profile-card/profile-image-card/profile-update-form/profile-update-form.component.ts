import { Component, DestroyRef, input, signal } from '@angular/core';
import { ProfileUpdateFormService } from './profile-update-form.service';
import { Store } from '@ngrx/store';
import { updateProfilePictureSuccess } from '../../../../../../shared/store/user/user.actions';

@Component({
  selector: 'app-profile-update-form',
  imports: [],
  templateUrl: './profile-update-form.component.html',
  styleUrl: './profile-update-form.component.css',
})
export class ProfileUpdateFormComponent {
  selectedFile: File | null = null;
  errorMessage: string = '';
  maxFileSize = 5 * 1024 * 1024;

  isUploadLoading = signal(false);
  profileUrl = input.required<string | null | undefined>();

  constructor(
    private profileUpdateFormService: ProfileUpdateFormService,
    private destoryRef: DestroyRef,
    private store: Store
  ) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.errorMessage = '';

    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please upload a valid image file.';
      this.selectedFile = null;
      return;
    }

    if (file.size > this.maxFileSize) {
      this.errorMessage = `File size exceeds the limit of ${
        this.maxFileSize / 1024 / 1024
      }MB.`;
      this.selectedFile = null;
      return;
    }

    this.isUploadLoading.set(true);

    this.selectedFile = file;
    const subscription = this.profileUpdateFormService
      .uploadProfile(file)
      .subscribe({
        next: (response: any) => {
          const updatedProfielUrl = response.data.imageUrl;

          this.store.dispatch(
            updateProfilePictureSuccess({ profile: updatedProfielUrl })
          );
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = `Failed to Update`;
        },
        complete: () => {
          this.isUploadLoading.set(false);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  removeFile(): void {
    this.selectedFile = null;
    this.errorMessage = '';

    this.store.dispatch(updateProfilePictureSuccess({ profile: '' }));

    const subscription = this.profileUpdateFormService
      .removeProfile()
      .subscribe({
        error: () => {
          const profileUrl = this.profileUrl();
          if (profileUrl) {
            this.store.dispatch(
              updateProfilePictureSuccess({ profile: profileUrl })
            );
          }
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
