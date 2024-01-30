import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDataProfileComponent } from './delete-data-profile.component';

describe('DeleteDataProfileComponent', () => {
  let component: DeleteDataProfileComponent;
  let fixture: ComponentFixture<DeleteDataProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDataProfileComponent]
    });
    fixture = TestBed.createComponent(DeleteDataProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
