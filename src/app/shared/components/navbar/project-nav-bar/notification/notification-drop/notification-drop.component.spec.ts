import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropComponent } from './notification-drop.component';

describe('NotificationDropComponent', () => {
  let component: NotificationDropComponent;
  let fixture: ComponentFixture<NotificationDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
