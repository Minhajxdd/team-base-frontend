import { Component, inject } from '@angular/core';
import { ProjectNavBarComponent } from '../../../../shared/components/navbar/project-nav-bar/project-nav-bar.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Profile {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-project-members',
  imports: [ProjectNavBarComponent],
  templateUrl: './project-members.component.html',
  styleUrl: './project-members.component.css',
  providers: [MessageService],
})
export class ProjectMembersComponent {
  // private messageService = inject(MessageService)

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

  // isVisible = false;
  // value1 = '';

  // formGroup = NewProjectFormGroup;

  // formToggle() {
  //   this.isVisible = !this.isVisible;
  // }

  // onSubmit() {
  //   if (this.formGroup.valid) {
  //     const name = this.formGroup.value.title;
  //     const description = this.formGroup.value.description;

  //     if (!name || !description) {
  //       return this.showWarningMessage('Invalid Input');
  //     }

  //     this.homeStartNewProjectService
  //       .createProject({
  //         name,
  //         description,
  //       })
  //       .subscribe({
  //         error: (err) => {
  //           console.log(err);
  //           return this.showWarningMessage('Something Went Wrong');
  //         },
  //         complete: () => {
  //           this.isVisible = false;
  //         },
  //         next: (data) => {
  //           this.homeComponentService.pushValues(data.data);
  //         },
  //       });
  //   } else {
  //     const titleErrors = this.formGroup.get('title')?.errors;
  //     const descriptionErrors = this.formGroup.get('description')?.errors;

  //     if (titleErrors) {
  //       return this.showWarningMessage(
  //         'Invalid Title:',
  //         'Title should not contain a number or symbol'
  //       );
  //     }
  //     if (descriptionErrors) {
  //       this.showWarningMessage(
  //         'Invalid Description:',
  //         'Description should not contain a number or symbol'
  //       );
  //     }
  //   }
  // }

  // showWarningMessage(summary: string, detail: string = '') {
  //   return this.messageService.add({
  //     severity: 'error',
  //     summary: summary,
  //     detail: detail,
  //   });
  // }
}
