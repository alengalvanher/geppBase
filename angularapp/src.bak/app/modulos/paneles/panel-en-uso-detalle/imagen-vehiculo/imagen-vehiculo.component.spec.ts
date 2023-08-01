import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenVehiculoComponent } from './imagen-vehiculo.component';

describe('ImagenVehiculoComponent', () => {
  let component: ImagenVehiculoComponent;
  let fixture: ComponentFixture<ImagenVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
