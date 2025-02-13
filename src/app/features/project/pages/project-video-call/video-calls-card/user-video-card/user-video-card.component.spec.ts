import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVideoCardComponent } from './user-video-card.component';

describe('UserVideoCardComponent', () => {
  let component: UserVideoCardComponent;
  let fixture: ComponentFixture<UserVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserVideoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
