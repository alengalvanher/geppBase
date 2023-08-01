import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarjetas2Component } from './tarjetas2.component';

describe('Tarjetas2Component', () => {
  let component: Tarjetas2Component;
  let fixture: ComponentFixture<Tarjetas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tarjetas2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tarjetas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
