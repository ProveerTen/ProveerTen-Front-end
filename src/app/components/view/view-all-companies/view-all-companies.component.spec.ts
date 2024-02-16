import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCompaniesComponent } from './view-all-companies.component';

describe('ViewAllCompaniesComponent', () => {
  let component: ViewAllCompaniesComponent;
  let fixture: ComponentFixture<ViewAllCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllCompaniesComponent]
    });
    fixture = TestBed.createComponent(ViewAllCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
