import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionsBoxComponent } from './quick-actions-box.component';

describe('QuickActionsBoxComponent', () => {
  let component: QuickActionsBoxComponent;
  let fixture: ComponentFixture<QuickActionsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickActionsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
