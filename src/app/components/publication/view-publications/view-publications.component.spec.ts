import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicationsComponent } from './view-publications.component';

describe('ViewPublicationsComponent', () => {
  let component: ViewPublicationsComponent;
  let fixture: ComponentFixture<ViewPublicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPublicationsComponent]
    });
    fixture = TestBed.createComponent(ViewPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
