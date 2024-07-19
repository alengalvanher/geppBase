import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSegurosComponent } from './form-seguros.component';

describe('FormSegurosComponent', () => {
  let component: FormSegurosComponent;
  let fixture: ComponentFixture<FormSegurosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSegurosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSegurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
