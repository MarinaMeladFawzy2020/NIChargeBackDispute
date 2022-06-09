import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportfromjiraComponent } from './importfromjira.component';

describe('ImportfromjiraComponent', () => {
  let component: ImportfromjiraComponent;
  let fixture: ComponentFixture<ImportfromjiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportfromjiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportfromjiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
