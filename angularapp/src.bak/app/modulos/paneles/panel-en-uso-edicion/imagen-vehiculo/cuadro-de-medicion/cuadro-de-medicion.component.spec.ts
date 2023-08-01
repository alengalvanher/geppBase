import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroDeMedicionComponent } from './cuadro-de-medicion.component';

describe('CuadroDeMedicionComponent', () => {
  let component: CuadroDeMedicionComponent;
  let fixture: ComponentFixture<CuadroDeMedicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadroDeMedicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadroDeMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
