import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDetalleComponent } from './inventario-detalle.component';

describe('InventarioDetalleComponent', () => {
  let component: InventarioDetalleComponent;
  let fixture: ComponentFixture<InventarioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
