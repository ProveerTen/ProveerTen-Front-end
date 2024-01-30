import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileProviderComponent } from './update-profile-provider.component';

describe('UpdateProfileProviderComponent', () => {
  let component: UpdateProfileProviderComponent;
  let fixture: ComponentFixture<UpdateProfileProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileProviderComponent]
    });
    fixture = TestBed.createComponent(UpdateProfileProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
