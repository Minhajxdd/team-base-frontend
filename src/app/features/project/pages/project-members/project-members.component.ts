import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectNavBarComponent } from '../../../../shared/components/navbar/project-nav-bar/project-nav-bar.component';
import { ProjectMemberService } from './project-members.service';
import { roles } from './project-members.constants';
import { ProjectMembersDisplayComponent } from './project-members-display/project-members-display.component';
import { Store } from '@ngrx/store';
import { addProjectId } from '../../store/project.action';
import {
  selectProjectId,
  selectProjectRole,
} from '../../store/project.selector';

@Component({
  selector: 'app-project-members',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TextareaModule,
    Toast,
    AutoCompleteModule,
    DropdownModule,
    ProjectNavBarComponent,
    ProjectMembersDisplayComponent,
  ],
  templateUrl: './project-members.component.html',
  styleUrl: './project-members.component.css',
})
export class ProjectMembersComponent {
  private readonly projectMemberService = inject(ProjectMemberService);
  private readonly destoryRef = inject(DestroyRef);

  projectId = signal<string>('');
  role = signal<string>('');
  isVisible = false;

  value = '';

  roles = roles;

  filteredItems: any[] = [];
  selectedItem: any;

  addMemberFormErrorMessage = signal<string>('');

  constructor(private store: Store) {
    let projectId = inject(ActivatedRoute).snapshot.params['projectId'];

    this.store.dispatch(addProjectId({ projectId: projectId }));

    const subscription1 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId.set(data);
      });

    const subscription2 = this.store.select(selectProjectRole).subscribe({
      next: (role) => {
        if (role) {
          this.role.set(role);
        }
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  }

  formToggle() {
    this.isVisible = !this.isVisible;
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.addMemberFormErrorMessage.set('');

      const subscription = this.projectMemberService
        .sentRequest(
          {
            email: form.value.email,
            roles: form.value.role.value,
            message: form.value.message,
          },
          this.projectId()
        )
        .subscribe({
          complete: () => {
            this.projectMemberService.showToast(
              'success',
              'Request Sent Successfully!'
            );

            this.formToggle();
          },
          error: (err) => {
            this.addMemberFormErrorMessage.set(err);
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.log('Form is invalid');
    }
  }

  search(event: any) {
    const query = event.query;
    const subscription = this.projectMemberService
      .getUserData(query)
      .subscribe({
        next: (data) => {
          this.filteredItems = data.map((item: any) => item.email);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  selectedRole: string = '';
}
