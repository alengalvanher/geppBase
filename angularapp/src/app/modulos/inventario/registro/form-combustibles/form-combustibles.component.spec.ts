import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCombustiblesComponent } from './form-combustibles.component';

describe('FormCombustiblesComponent', () => {
  let component: FormCombustiblesComponent;
  let fixture: ComponentFixture<FormCombustiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCombustiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCombustiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
