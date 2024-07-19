import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCamionComponent } from './plantilla-camion.component';

describe('PlantillaCamionComponent', () => {
  let component: PlantillaCamionComponent;
  let fixture: ComponentFixture<PlantillaCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaCamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
