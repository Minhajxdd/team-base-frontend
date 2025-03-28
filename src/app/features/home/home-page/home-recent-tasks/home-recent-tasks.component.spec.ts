import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecentTasksComponent } from './home-recent-tasks.component';

describe('HomeRecentTasksComponent', () => {
  let component: HomeRecentTasksComponent;
  let fixture: ComponentFixture<HomeRecentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRecentTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRecentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
