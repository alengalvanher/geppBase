import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLeasingComponent } from './form-leasing.component';

describe('FormLeasingComponent', () => {
  let component: FormLeasingComponent;
  let fixture: ComponentFixture<FormLeasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLeasingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
