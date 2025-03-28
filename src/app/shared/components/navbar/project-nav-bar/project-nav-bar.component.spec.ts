import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNavBarComponent } from './project-nav-bar.component';

describe('ProjectNavBarComponent', () => {
  let component: ProjectNavBarComponent;
  let fixture: ComponentFixture<ProjectNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
