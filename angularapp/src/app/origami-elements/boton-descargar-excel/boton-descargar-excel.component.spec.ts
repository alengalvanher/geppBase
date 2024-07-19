import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonDescargarExcelComponent } from './boton-descargar-excel.component';

describe('BotonDescargarExcelComponent', () => {
  let component: BotonDescargarExcelComponent;
  let fixture: ComponentFixture<BotonDescargarExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonDescargarExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonDescargarExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
