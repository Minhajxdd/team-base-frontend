import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalCommentsComponent } from './task-modal-comments.component';

describe('TaskModalCommentsComponent', () => {
  let component: TaskModalCommentsComponent;
  let fixture: ComponentFixture<TaskModalCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
