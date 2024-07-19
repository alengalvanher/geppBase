import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonStatusComponent } from './boton-status.component';

describe('BotonStatusComponent', () => {
  let component: BotonStatusComponent;
  let fixture: ComponentFixture<BotonStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
