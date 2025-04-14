import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileImageCardComponent } from './profile-card/profile-image-card/profile-image-card.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../shared/components/navbar/navbar.model';
import { selectUser } from '../../../shared/store/user/user.selector';
import { UserNavbarComponent } from '../../../shared/components/navbar/user-navbar/user-navbar.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProfileEditService } from './profile-edit.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ProfileImageCardComponent,
    UserNavbarComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProfileEditComponent implements OnDestroy, OnInit {
  user$!: Observable<any>;
  subscription1$!: Subscription;
  user = signal<User | null>(null);
  profileForm!: FormGroup;
  skills: string[] = [];
  isSubmitting = false;
  formSubmitted = false;
  passwordResetSent = false;
  updateSuccess = false;
  updateError = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private _profileEditService: ProfileEditService,
    private _destoryRef: DestroyRef
  ) {
    this.user$ = this.store.select(selectUser);
    this.subscription1$ = this.user$.subscribe((data) => {
      this.user.set(data);
      this.initForm();
    });

    this.getProfileData();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      fullName: [
        this.user()?.fullName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      email: [
        this.user()?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: ['', [Validators.pattern(/^\+?[0-9\s()-]{8,20}$/)]],
      education: [''],
      hobbies: [''],
      socialMedia: [
        '',
        Validators.pattern(
          /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?$/
        ),
      ],
      isPublic: [false],
    });
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
  }

  addSkill(skill: string): void {
    if (!skill || this.skills.includes(skill)) return;

    this.skills = [...this.skills, skill.trim()];
    const inputElement = document.getElementById(
      'skillInput'
    ) as HTMLInputElement;
    if (inputElement) inputElement.value = '';
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter((s) => s !== skill);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      this.addSkill(target.value);
    }
  }

  resetPassword(): void {
    this.passwordResetSent = true;

    setTimeout(() => {
      this.passwordResetSent = false;
    }, 3000);
  }

  backend_errors = [];

  saveProfile(): void {
    this.backend_errors = [];

    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.isSubmitting = true;
    this.updateSuccess = false;
    this.updateError = false;

    // Prepare data for API endpoint
    const profileData = {
      ...this.profileForm.value,
      skills: this.skills,
    };

    console.log('Sending profile data to API:', profileData);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.updateSuccess = true;

      // Reset success message after 3 seconds
      setTimeout(() => {
        this.updateSuccess = false;
      }, 3000);
    }, 1500);

    const subscription = this._profileEditService
      .editProfile(profileData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.updateSuccess = true;
          setTimeout(() => (this.updateSuccess = false), 3000);
        },
        error: (error) => {
          this.backend_errors = error.error.message;
          this.isSubmitting = false;
          this.updateError = true;
          setTimeout(() => (this.updateError = false), 3000);
        },
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  hasError(controlName: string): boolean {
    const control = this.profileForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.profileForm.get(controlName);
    if (!control) return '';

    if (control.errors?.['required']) return 'This field is required';
    if (control.errors?.['email']) return 'Please enter a valid email address';
    if (control.errors?.['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors?.['pattern']) {
      if (controlName === 'phone') return 'Please enter a valid phone number';
      if (controlName === 'socialMedia') return 'Please enter a valid URL';
    }

    return 'Invalid input';
  }

  getProfileData() {
    const subscription = this._profileEditService.getProfile().subscribe({
      next: (data) => {
        const user = data.data.user;

        setTimeout(() => {
          this.profileForm.patchValue({
            fullName: user.full_name,
            email: user.email,
            phone: user.phone,
            education: user.education,
            hobbies: user.hobbies,
            socialMedia: user.socialMedia,
            isPublic: user.isPublic,
          });

          this.skills = data.data.user.skills;
        }, 10);
      },
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
