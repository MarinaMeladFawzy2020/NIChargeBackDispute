import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorydisputeComponent } from './historydispute.component';

describe('HistorydisputeComponent', () => {
  let component: HistorydisputeComponent;
  let fixture: ComponentFixture<HistorydisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorydisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorydisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
