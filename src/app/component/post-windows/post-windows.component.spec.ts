import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWindowsComponent } from './post-windows.component';

describe('PostWindowsComponent', () => {
  let component: PostWindowsComponent;
  let fixture: ComponentFixture<PostWindowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostWindowsComponent]
    });
    fixture = TestBed.createComponent(PostWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
