import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkeddisputeComponent } from './linkeddispute.component';

describe('LinkeddisputeComponent', () => {
  let component: LinkeddisputeComponent;
  let fixture: ComponentFixture<LinkeddisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkeddisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkeddisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
