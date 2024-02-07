import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicationsComponent } from './manage-publications.component';

describe('ManagePublicationsComponent', () => {
  let component: ManagePublicationsComponent;
  let fixture: ComponentFixture<ManagePublicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePublicationsComponent]
    });
    fixture = TestBed.createComponent(ManagePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
