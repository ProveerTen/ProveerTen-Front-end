import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingSliderComponent } from './advertising-slider.component';

describe('AdvertisingSliderComponent', () => {
  let component: AdvertisingSliderComponent;
  let fixture: ComponentFixture<AdvertisingSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisingSliderComponent]
    });
    fixture = TestBed.createComponent(AdvertisingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
