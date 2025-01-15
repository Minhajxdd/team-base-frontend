import { Component, inject, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ProjectAuthService } from '../../../../core/auth/services/auth.project.roles.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectNavBarComponent } from "../../../../shared/components/navbar/project-nav-bar/project-nav-bar.component";


interface Profile {
  name: string;
  email: string;
  role: string;
}

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
    ProjectNavBarComponent
],
  templateUrl: './project-members.component.html',
  styleUrl: './project-members.component.css',
  providers: [MessageService],
})
export class ProjectMembersComponent {
  // private messageService = inject(MessageService)

  projectId = signal<string>('');
  role = signal<string>('');
  isVisible = false;

  filteredUsers: any[] = ['hello', 'world'];
  selectedUser: any = null;
  selectedRole: any = null;

  roles = [
    { label: 'Project Manager', value: 'project_manager' },
    { label: 'Team Lead', value: 'team_lead' },
    { label: 'Developer', value: 'developer' },
  ];


  constructor(
    private route: ActivatedRoute,
    private projectAuthService: ProjectAuthService
  ) {
    let projectId = route.snapshot.params['projectId'];
    this.projectId.set(projectId);

    this.projectAuthService.getRoleForProject(projectId).subscribe({
      next: (role) => {
        if (role) {
          this.role.set(role);
          console.log(role);
        }
      },
    });
  }

  formToggle() {
    this.isVisible = !this.isVisible;
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  searchUsers(event: any) {
    const query = event.query;
    // this.http.get<any[]>(`/api/users?search=${query}`).subscribe((data) => {
    //   this.filteredUsers = data;
    // });
  }

  profiles: Profile[] = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Product Designer',
    },
    {
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'Frontend Developer',
    },
    {
      name: 'Emma Wilson',
      email: 'emma.w@company.com',
      role: 'Project Manager',
    },
  ];
}
