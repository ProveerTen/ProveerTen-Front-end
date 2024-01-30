import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDataProfileGrocerComponent } from './delete-data-profile-grocer.component';

describe('DeleteDataProfileGrocerComponent', () => {
  let component: DeleteDataProfileGrocerComponent;
  let fixture: ComponentFixture<DeleteDataProfileGrocerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDataProfileGrocerComponent]
    });
    fixture = TestBed.createComponent(DeleteDataProfileGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
