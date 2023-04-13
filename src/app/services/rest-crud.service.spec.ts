import { TestBed } from '@angular/core/testing';

import { RestCrudService } from './rest-crud.service';

describe('RestCrudService', () => {
  let service: RestCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
