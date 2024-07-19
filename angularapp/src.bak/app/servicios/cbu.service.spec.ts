import { TestBed } from '@angular/core/testing';

import { CbuService } from './cbu.service';

describe('CbuService', () => {
  let service: CbuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
