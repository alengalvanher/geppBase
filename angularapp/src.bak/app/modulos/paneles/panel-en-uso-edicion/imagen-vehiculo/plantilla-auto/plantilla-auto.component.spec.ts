import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaAutoComponent } from './plantilla-auto.component';

describe('PlantillaAutoComponent', () => {
  let component: PlantillaAutoComponent;
  let fixture: ComponentFixture<PlantillaAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaAutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
