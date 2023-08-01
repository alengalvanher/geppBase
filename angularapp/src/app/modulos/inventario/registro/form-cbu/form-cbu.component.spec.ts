import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCbuComponent } from './form-cbu.component';

describe('FormCbuComponent', () => {
  let component: FormCbuComponent;
  let fixture: ComponentFixture<FormCbuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCbuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
