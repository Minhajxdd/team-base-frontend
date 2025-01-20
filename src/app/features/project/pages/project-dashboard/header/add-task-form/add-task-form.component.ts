import { CommonModule } from '@angular/common';
import { Component, DestroyRef, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTaskFormService } from './add-task-form.service';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../store/project.selector';
import { MessageService } from 'primeng/api';
import { MemberResponseModel } from './add-task-form.model';

import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-add-task-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.css',
})
export class AddTaskFormComponent {
  isVisible = input(true);
  closeForm = output<boolean>();

  projectId!: string;

  taskForm: FormGroup;

  Members!: MemberResponseModel[];

  constructor(
    private fb: FormBuilder,
    private addTaskFormService: AddTaskFormService,
    private store: Store,
    private destoryRef: DestroyRef,
    private messageService: MessageService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      description: [' ', Validators.pattern(/^[a-zA-Z\s]*$/)],
      assignedTo: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
    });

    const subscription1 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    const subscription2 = this.addTaskFormService
      .getMembers(this.projectId)
      .subscribe((data) => {
        this.Members = data;
      });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { assignedTo, deadline, description, priority, title } =
        this.taskForm.value;

      console.log(this.taskForm.value);
      const subscription = this.addTaskFormService
        .addTask(
          this.projectId,
          title,
          description,
          assignedTo,
          Number(priority),
          deadline
        )
        .subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successfully Task Assigned!',
              });

            this.oncloseForm();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
            });
          },
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  oncloseForm() {
    this.closeForm.emit(false);
  }
}
