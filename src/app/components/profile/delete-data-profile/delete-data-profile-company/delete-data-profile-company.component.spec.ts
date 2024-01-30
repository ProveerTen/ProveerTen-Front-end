import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDataProfileCompanyComponent } from './delete-data-profile-company.component';

describe('DeleteDataProfileCompanyComponent', () => {
  let component: DeleteDataProfileCompanyComponent;
  let fixture: ComponentFixture<DeleteDataProfileCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDataProfileCompanyComponent]
    });
    fixture = TestBed.createComponent(DeleteDataProfileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
