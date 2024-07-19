import { TestBed } from '@angular/core/testing';

import { ConsultaDetalleService } from './consulta-detalle.service';

describe('ConsultaDetalleService', () => {
  let service: ConsultaDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
