import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetalldisputeComponent } from './getalldispute.component';

describe('GetalldisputeComponent', () => {
  let component: GetalldisputeComponent;
  let fixture: ComponentFixture<GetalldisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetalldisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetalldisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
