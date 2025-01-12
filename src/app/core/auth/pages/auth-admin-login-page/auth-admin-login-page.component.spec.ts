import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminLoginPageComponent } from './auth-admin-login-page.component';

describe('AuthAdminLoginPageComponent', () => {
  let component: AuthAdminLoginPageComponent;
  let fixture: ComponentFixture<AuthAdminLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAdminLoginPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAdminLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
