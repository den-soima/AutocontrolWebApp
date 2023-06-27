import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocontrolDialogComponent } from './autocontrol-dialog.component';

describe('DialogComponent', () => {
  let component: AutocontrolDialogComponent;
  let fixture: ComponentFixture<AutocontrolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocontrolDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocontrolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
