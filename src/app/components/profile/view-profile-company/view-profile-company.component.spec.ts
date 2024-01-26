import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileCompanyComponent } from './view-profile-company.component';

describe('ViewProfileCompanyComponent', () => {
  let component: ViewProfileCompanyComponent;
  let fixture: ComponentFixture<ViewProfileCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileCompanyComponent]
    });
    fixture = TestBed.createComponent(ViewProfileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
