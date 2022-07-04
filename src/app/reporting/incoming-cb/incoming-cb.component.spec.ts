import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingCBComponent } from './incoming-cb.component';

describe('IncomingCBComponent', () => {
  let component: IncomingCBComponent;
  let fixture: ComponentFixture<IncomingCBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingCBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
