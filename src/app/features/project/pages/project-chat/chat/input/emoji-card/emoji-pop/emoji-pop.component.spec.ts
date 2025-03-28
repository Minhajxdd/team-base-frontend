import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPopComponent } from './emoji-pop.component';

describe('EmojiPopComponent', () => {
  let component: EmojiPopComponent;
  let fixture: ComponentFixture<EmojiPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiPopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
