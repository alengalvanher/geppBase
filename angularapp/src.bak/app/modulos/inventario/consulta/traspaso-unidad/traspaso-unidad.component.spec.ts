import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraspasoUnidadComponent } from './traspaso-unidad.component';

describe('TraspasoUnidadComponent', () => {
  let component: TraspasoUnidadComponent;
  let fixture: ComponentFixture<TraspasoUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraspasoUnidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraspasoUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
