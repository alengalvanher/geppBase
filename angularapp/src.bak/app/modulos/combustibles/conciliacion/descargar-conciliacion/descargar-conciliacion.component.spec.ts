import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarConciliacionComponent } from './descargar-conciliacion.component';

describe('DescargarConciliacionComponent', () => {
  let component: DescargarConciliacionComponent;
  let fixture: ComponentFixture<DescargarConciliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarConciliacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarConciliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
