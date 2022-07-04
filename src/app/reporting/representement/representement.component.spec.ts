import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentementComponent } from './representement.component';

describe('RepresentementComponent', () => {
  let component: RepresentementComponent;
  let fixture: ComponentFixture<RepresentementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
