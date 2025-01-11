import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWelcomeBannerComponent } from './home-welcome-banner.component';

describe('HomeWelcomeBannerComponent', () => {
  let component: HomeWelcomeBannerComponent;
  let fixture: ComponentFixture<HomeWelcomeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWelcomeBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWelcomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
