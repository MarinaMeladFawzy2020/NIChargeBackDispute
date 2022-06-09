import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdisputeComponent } from './editdispute.component';

describe('EditdisputeComponent', () => {
  let component: EditdisputeComponent;
  let fixture: ComponentFixture<EditdisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
