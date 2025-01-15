import {
  Component,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { NewProjectFormGroup } from './home-start-new-project.template';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HomeStartNewProjectService } from './home-start-new-project.service';
import { HomeComponentService } from '../home-component.service';

@Component({
  selector: 'app-home-start-new-project',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TextareaModule,
    ReactiveFormsModule,
    Toast,
  ],
  templateUrl: './home-start-new-project.component.html',
  styleUrl: './home-start-new-project.component.css',
  providers: [MessageService],
})
export class HomeStartNewProjectComponent {
  private readonly messageService = inject(MessageService);
  private readonly homeStartNewProjectService = inject(
    HomeStartNewProjectService
  );
  private homeComponentService = inject(HomeComponentService);
  private destoryRef = inject(DestroyRef);

  isVisible = false;
  value1 = '';

  formGroup = NewProjectFormGroup;

  formToggle() {
    this.isVisible = !this.isVisible;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const name = this.formGroup.value.title;
      const description = this.formGroup.value.description;

      if (!name || !description) {
        return this.showWarningMessage('Invalid Input');
      }

      const subscription = this.homeStartNewProjectService
        .createProject({
          name,
          description,
        })
        .subscribe({
          error: (err) => {
            console.log(err);
            return this.showWarningMessage('Something Went Wrong');
          },
          complete: () => {
            this.isVisible = false;
          },
          next: (data) => {
            this.homeComponentService.pushValues(data.data);
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      const titleErrors = this.formGroup.get('title')?.errors;
      const descriptionErrors = this.formGroup.get('description')?.errors;

      if (titleErrors) {
        return this.showWarningMessage(
          'Invalid Title:',
          'Title should not contain a number or symbol'
        );
      }
      if (descriptionErrors) {
        this.showWarningMessage(
          'Invalid Description:',
          'Description should not contain a number or symbol'
        );
      }
    }
  }

  showWarningMessage(summary: string, detail: string = '') {
    return this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
}
