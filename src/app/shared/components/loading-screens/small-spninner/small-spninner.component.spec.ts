import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSpninnerComponent } from './small-spninner.component';

describe('SmallSpninnerComponent', () => {
  let component: SmallSpninnerComponent;
  let fixture: ComponentFixture<SmallSpninnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSpninnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSpninnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
