import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgenciaComponent } from './form-agencia.component';

describe('FormAgenciaComponent', () => {
  let component: FormAgenciaComponent;
  let fixture: ComponentFixture<FormAgenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAgenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
