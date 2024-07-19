import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeColumnasComponent } from './gestor-de-columnas.component';

describe('GestorDeColumnasComponent', () => {
  let component: GestorDeColumnasComponent;
  let fixture: ComponentFixture<GestorDeColumnasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorDeColumnasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorDeColumnasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
