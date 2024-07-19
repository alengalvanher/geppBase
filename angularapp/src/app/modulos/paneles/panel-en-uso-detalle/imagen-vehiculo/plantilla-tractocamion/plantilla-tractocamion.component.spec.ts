import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaTractocamionComponent } from './plantilla-tractocamion.component';

describe('PlantillaTractocamionComponent', () => {
  let component: PlantillaTractocamionComponent;
  let fixture: ComponentFixture<PlantillaTractocamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaTractocamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaTractocamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
