import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetPwEmailComponent } from './auth-reset-pw-email.component';

describe('AuthResetPwEmailComponent', () => {
  let component: AuthResetPwEmailComponent;
  let fixture: ComponentFixture<AuthResetPwEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResetPwEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResetPwEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
