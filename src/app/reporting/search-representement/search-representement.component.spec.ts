import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRepresentementComponent } from './search-representement.component';

describe('SearchRepresentementComponent', () => {
  let component: SearchRepresentementComponent;
  let fixture: ComponentFixture<SearchRepresentementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRepresentementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRepresentementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
