import { TestBed } from '@angular/core/testing';

import { AutocontrolCrudService } from './autocontrol-crud.service';

describe('AutocontorCrudService', () => {
  let service: AutocontrolCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocontrolCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
