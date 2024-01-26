import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileGrocerComponent } from './view-profile-grocer.component';

describe('ViewProfileGrocerComponent', () => {
  let component: ViewProfileGrocerComponent;
  let fixture: ComponentFixture<ViewProfileGrocerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileGrocerComponent]
    });
    fixture = TestBed.createComponent(ViewProfileGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
