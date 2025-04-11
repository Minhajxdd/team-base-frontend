import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFormComponent } from './notes-form-component.component';

describe('NotesFormComponentComponent', () => {
  let component: NotesFormComponent;
  let fixture: ComponentFixture<NotesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
