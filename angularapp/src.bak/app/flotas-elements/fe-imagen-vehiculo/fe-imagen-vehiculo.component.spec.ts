import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeImagenVehiculoComponent } from './fe-imagen-vehiculo.component';

describe('FeImagenVehiculoComponent', () => {
  let component: FeImagenVehiculoComponent;
  let fixture: ComponentFixture<FeImagenVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeImagenVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeImagenVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
