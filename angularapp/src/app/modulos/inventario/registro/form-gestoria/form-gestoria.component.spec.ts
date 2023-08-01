import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestoriaComponent } from './form-gestoria.component';

describe('FormGestoriaComponent', () => {
  let component: FormGestoriaComponent;
  let fixture: ComponentFixture<FormGestoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGestoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
