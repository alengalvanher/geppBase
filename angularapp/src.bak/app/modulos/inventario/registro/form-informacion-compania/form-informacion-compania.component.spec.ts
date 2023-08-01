import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformacionCompaniaComponent } from './form-informacion-compania.component';

describe('FormInformacionCompaniaComponent', () => {
  let component: FormInformacionCompaniaComponent;
  let fixture: ComponentFixture<FormInformacionCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInformacionCompaniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInformacionCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
