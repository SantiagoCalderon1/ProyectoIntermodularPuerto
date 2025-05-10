import { TestBed } from '@angular/core/testing';

import { TransitosService } from './transitos.service';

describe('TransitosService', () => {
  let service: TransitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
