import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileGrocerComponent } from './update-profile-grocer.component';

describe('UpdateProfileGrocerComponent', () => {
  let component: UpdateProfileGrocerComponent;
  let fixture: ComponentFixture<UpdateProfileGrocerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileGrocerComponent]
    });
    fixture = TestBed.createComponent(UpdateProfileGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
