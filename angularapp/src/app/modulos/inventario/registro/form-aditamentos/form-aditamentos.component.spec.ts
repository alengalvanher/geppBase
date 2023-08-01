import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAditamentosComponent } from './form-aditamentos.component';

describe('FormAditamentosComponent', () => {
  let component: FormAditamentosComponent;
  let fixture: ComponentFixture<FormAditamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAditamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAditamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
