import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreArbComponent } from './pre-arb.component';

describe('PreArbComponent', () => {
  let component: PreArbComponent;
  let fixture: ComponentFixture<PreArbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreArbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreArbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
