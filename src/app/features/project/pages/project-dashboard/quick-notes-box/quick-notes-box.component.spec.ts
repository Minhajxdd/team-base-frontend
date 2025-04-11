import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNotesBoxComponent } from './quick-notes-box.component';

describe('QuickNotesBoxComponent', () => {
  let component: QuickNotesBoxComponent;
  let fixture: ComponentFixture<QuickNotesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickNotesBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickNotesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
