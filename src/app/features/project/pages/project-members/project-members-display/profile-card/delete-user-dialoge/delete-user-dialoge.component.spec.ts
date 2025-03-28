import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDialogeComponent } from './delete-user-dialoge.component';

describe('DeleteUserDialogeComponent', () => {
  let component: DeleteUserDialogeComponent;
  let fixture: ComponentFixture<DeleteUserDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserDialogeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
