import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedisputeComponent } from './createdispute.component';

describe('CreatedisputeComponent', () => {
  let component: CreatedisputeComponent;
  let fixture: ComponentFixture<CreatedisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
