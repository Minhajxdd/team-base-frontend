import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNoMembersComponent } from './profile-no-members.component';

describe('ProfileNoMembersComponent', () => {
  let component: ProfileNoMembersComponent;
  let fixture: ComponentFixture<ProfileNoMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNoMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNoMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
