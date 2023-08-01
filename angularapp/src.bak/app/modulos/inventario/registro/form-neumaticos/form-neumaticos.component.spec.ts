import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNeumaticosComponent } from './form-neumaticos.component';

describe('FormNeumaticosComponent', () => {
  let component: FormNeumaticosComponent;
  let fixture: ComponentFixture<FormNeumaticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNeumaticosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNeumaticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
