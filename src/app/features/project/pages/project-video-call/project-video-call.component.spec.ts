import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVideoCallComponent } from './project-video-call.component';

describe('ProjectVideoCallComponent', () => {
  let component: ProjectVideoCallComponent;
  let fixture: ComponentFixture<ProjectVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectVideoCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
