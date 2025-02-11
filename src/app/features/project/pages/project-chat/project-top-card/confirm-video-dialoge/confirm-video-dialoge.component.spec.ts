import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVideoDialogeComponent } from './confirm-video-dialoge.component';

describe('ConfirmVideoDialogeComponent', () => {
  let component: ConfirmVideoDialogeComponent;
  let fixture: ComponentFixture<ConfirmVideoDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmVideoDialogeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmVideoDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
