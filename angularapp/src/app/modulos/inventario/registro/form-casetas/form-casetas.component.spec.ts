import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCasetasComponent } from './form-casetas.component';

describe('FormCasetasComponent', () => {
  let component: FormCasetasComponent;
  let fixture: ComponentFixture<FormCasetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCasetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCasetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
