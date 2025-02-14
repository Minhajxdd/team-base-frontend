import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTasksBoxComponent } from './latest-tasks-box.component';

describe('LatestTasksBoxComponent', () => {
  let component: LatestTasksBoxComponent;
  let fixture: ComponentFixture<LatestTasksBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestTasksBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestTasksBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
