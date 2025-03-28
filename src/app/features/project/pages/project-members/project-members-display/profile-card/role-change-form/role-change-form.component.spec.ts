import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleChangeFormComponent } from './role-change-form.component';

describe('RoleChangeFormComponent', () => {
  let component: RoleChangeFormComponent;
  let fixture: ComponentFixture<RoleChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleChangeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
