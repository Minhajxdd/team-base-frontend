import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropCardComponent } from './notification-drop-card.component';

describe('NotificationDropCardComponent', () => {
  let component: NotificationDropCardComponent;
  let fixture: ComponentFixture<NotificationDropCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationDropCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationDropCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
