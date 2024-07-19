import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonPastillaComponent } from './boton-pastilla.component';

describe('BotonPastillaComponent', () => {
  let component: BotonPastillaComponent;
  let fixture: ComponentFixture<BotonPastillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonPastillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonPastillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
