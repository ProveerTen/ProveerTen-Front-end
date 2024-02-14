import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllGrocersComponent } from './view-all-grocers.component';

describe('ViewAllGrocersComponent', () => {
  let component: ViewAllGrocersComponent;
  let fixture: ComponentFixture<ViewAllGrocersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllGrocersComponent]
    });
    fixture = TestBed.createComponent(ViewAllGrocersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
