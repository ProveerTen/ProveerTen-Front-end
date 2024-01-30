import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileProviderComponent } from './view-profile-provider.component';

describe('ViewProfileProviderComponent', () => {
  let component: ViewProfileProviderComponent;
  let fixture: ComponentFixture<ViewProfileProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileProviderComponent]
    });
    fixture = TestBed.createComponent(ViewProfileProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
