import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallsCardComponent } from './video-calls-card.component';

describe('VideoCallsCardComponent', () => {
  let component: VideoCallsCardComponent;
  let fixture: ComponentFixture<VideoCallsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCallsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCallsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
