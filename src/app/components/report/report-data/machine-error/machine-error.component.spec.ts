import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineErrorComponent } from './machine-error.component';

describe('MachineErrorComponent', () => {
  let component: MachineErrorComponent;
  let fixture: ComponentFixture<MachineErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
