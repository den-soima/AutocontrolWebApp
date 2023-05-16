import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocontrolComponent } from './autocontrol.component';

describe('AutocontrolComponent', () => {
  let component: AutocontrolComponent;
  let fixture: ComponentFixture<AutocontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocontrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
