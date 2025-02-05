import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTopCardComponent } from './project-top-card.component';

describe('ProjectTopCardComponent', () => {
  let component: ProjectTopCardComponent;
  let fixture: ComponentFixture<ProjectTopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTopCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
