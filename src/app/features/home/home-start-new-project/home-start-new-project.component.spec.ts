import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStartNewProjectComponent } from './home-start-new-project.component';

describe('HomeStartNewProjectComponent', () => {
  let component: HomeStartNewProjectComponent;
  let fixture: ComponentFixture<HomeStartNewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStartNewProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStartNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
