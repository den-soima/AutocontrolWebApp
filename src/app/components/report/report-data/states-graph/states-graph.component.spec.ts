import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesGraphComponent } from './states-graph.component';

describe('StatesGraphComponent', () => {
  let component: StatesGraphComponent;
  let fixture: ComponentFixture<StatesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
