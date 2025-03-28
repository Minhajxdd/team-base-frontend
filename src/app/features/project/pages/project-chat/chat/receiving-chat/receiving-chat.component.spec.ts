import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingChatComponent } from './receiving-chat.component';

describe('ReceivingChatComponent', () => {
  let component: ReceivingChatComponent;
  let fixture: ComponentFixture<ReceivingChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
