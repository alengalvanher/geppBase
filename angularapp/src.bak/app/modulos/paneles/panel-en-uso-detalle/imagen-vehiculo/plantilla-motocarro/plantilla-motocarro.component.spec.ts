import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaMotocarroComponent } from './plantilla-motocarro.component';

describe('PlantillaMotocarroComponent', () => {
  let component: PlantillaMotocarroComponent;
  let fixture: ComponentFixture<PlantillaMotocarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaMotocarroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaMotocarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
