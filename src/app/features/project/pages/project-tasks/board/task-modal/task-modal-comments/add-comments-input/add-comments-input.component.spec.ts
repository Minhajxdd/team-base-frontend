import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentsInputComponent } from './add-comments-input.component';

describe('AddCommentsInputComponent', () => {
  let component: AddCommentsInputComponent;
  let fixture: ComponentFixture<AddCommentsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommentsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
