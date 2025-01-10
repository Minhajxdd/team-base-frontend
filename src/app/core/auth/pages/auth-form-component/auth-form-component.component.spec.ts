import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponentComponent } from './auth-form-component.component';

describe('AuthFormComponentComponent', () => {
  let component: AuthFormComponentComponent;
  let fixture: ComponentFixture<AuthFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
