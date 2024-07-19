import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnUsoDetalleComponent } from './panel-en-uso-detalle.component';

describe('EnUsoDetalleComponent', () => {
  let component: EnUsoDetalleComponent;
  let fixture: ComponentFixture<EnUsoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnUsoDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnUsoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
