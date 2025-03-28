import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageCardComponent } from './profile-image-card.component';

describe('ProfileImageCardComponent', () => {
  let component: ProfileImageCardComponent;
  let fixture: ComponentFixture<ProfileImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
