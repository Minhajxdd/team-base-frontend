import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeYourProjectsComponent } from './home-your-projects.component';

describe('HomeYourProjectsComponent', () => {
  let component: HomeYourProjectsComponent;
  let fixture: ComponentFixture<HomeYourProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeYourProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeYourProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
