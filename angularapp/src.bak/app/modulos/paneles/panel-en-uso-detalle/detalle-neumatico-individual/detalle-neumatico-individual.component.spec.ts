import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNeumaticoIndividualComponent } from './detalle-neumatico-individual.component';

describe('DetalleNeumaticoIndividualComponent', () => {
  let component: DetalleNeumaticoIndividualComponent;
  let fixture: ComponentFixture<DetalleNeumaticoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleNeumaticoIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleNeumaticoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
