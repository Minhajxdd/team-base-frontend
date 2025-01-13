import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetVerifyComponent } from './auth-reset-verify.component';

describe('AuthResetVerifyComponent', () => {
  let component: AuthResetVerifyComponent;
  let fixture: ComponentFixture<AuthResetVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResetVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResetVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
