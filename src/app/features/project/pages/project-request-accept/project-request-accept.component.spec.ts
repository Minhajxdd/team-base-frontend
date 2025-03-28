import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestAcceptComponent } from './project-request-accept.component';

describe('ProjectRequestAcceptComponent', () => {
  let component: ProjectRequestAcceptComponent;
  let fixture: ComponentFixture<ProjectRequestAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRequestAcceptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRequestAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
