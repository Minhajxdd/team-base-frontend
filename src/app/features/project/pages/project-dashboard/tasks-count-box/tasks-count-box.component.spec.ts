import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCountBoxComponent } from './tasks-count-box.component';

describe('TasksCountBoxComponent', () => {
  let component: TasksCountBoxComponent;
  let fixture: ComponentFixture<TasksCountBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCountBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksCountBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
