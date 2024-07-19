import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosConsultaHistoricosComponent } from './inventarios-consulta-historicos.component';

describe('InventariosConsultaHistoricosComponent', () => {
  let component: InventariosConsultaHistoricosComponent;
  let fixture: ComponentFixture<InventariosConsultaHistoricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariosConsultaHistoricosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosConsultaHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
