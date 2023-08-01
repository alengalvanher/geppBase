import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActivoFijoComponent } from './form-activo-fijo.component';

describe('FormActivoFijoComponent', () => {
  let component: FormActivoFijoComponent;
  let fixture: ComponentFixture<FormActivoFijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActivoFijoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActivoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
