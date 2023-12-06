import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingWindowsComponent } from './advertising-windows.component';

describe('AdvertisingWindowsComponent', () => {
  let component: AdvertisingWindowsComponent;
  let fixture: ComponentFixture<AdvertisingWindowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisingWindowsComponent]
    });
    fixture = TestBed.createComponent(AdvertisingWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
