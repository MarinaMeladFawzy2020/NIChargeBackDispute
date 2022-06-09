import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsdisputeComponent } from './detailsdispute.component';

describe('DetailsdisputeComponent', () => {
  let component: DetailsdisputeComponent;
  let fixture: ComponentFixture<DetailsdisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsdisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsdisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
