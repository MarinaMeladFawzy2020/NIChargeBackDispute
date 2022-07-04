import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPreArpComponent } from './search-pre-arp.component';

describe('SearchPreArpComponent', () => {
  let component: SearchPreArpComponent;
  let fixture: ComponentFixture<SearchPreArpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPreArpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPreArpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
