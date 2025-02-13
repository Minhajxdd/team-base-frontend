import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersVideoCardComponent } from './others-video-card.component';

describe('OthersVideoCardComponent', () => {
  let component: OthersVideoCardComponent;
  let fixture: ComponentFixture<OthersVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthersVideoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
