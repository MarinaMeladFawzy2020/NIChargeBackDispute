import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketlogsComponent } from './ticketlogs.component';

describe('TicketlogsComponent', () => {
  let component: TicketlogsComponent;
  let fixture: ComponentFixture<TicketlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
