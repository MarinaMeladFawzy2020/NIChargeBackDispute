import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdisputeComponent } from './searchdispute.component';

describe('SearchdisputeComponent', () => {
  let component: SearchdisputeComponent;
  let fixture: ComponentFixture<SearchdisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchdisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
