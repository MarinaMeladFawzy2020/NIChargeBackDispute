import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeBackSearchComponent } from './charge-back-search.component';

describe('ChargeBackSearchComponent', () => {
  let component: ChargeBackSearchComponent;
  let fixture: ComponentFixture<ChargeBackSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeBackSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeBackSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
