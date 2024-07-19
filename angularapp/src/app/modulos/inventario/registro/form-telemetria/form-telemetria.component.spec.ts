import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelemetriaComponent } from './form-telemetria.component';

describe('FormTelemetriaComponent', () => {
  let component: FormTelemetriaComponent;
  let fixture: ComponentFixture<FormTelemetriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTelemetriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTelemetriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
