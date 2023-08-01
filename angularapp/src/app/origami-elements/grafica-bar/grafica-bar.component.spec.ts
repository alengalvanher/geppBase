import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarComponent } from './grafica-bar.component';

describe('GraficaBarComponent', () => {
  let component: GraficaBarComponent;
  let fixture: ComponentFixture<GraficaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
