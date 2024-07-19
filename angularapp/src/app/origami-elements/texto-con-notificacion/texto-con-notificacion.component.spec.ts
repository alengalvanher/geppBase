import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoConNotificacionComponent } from './texto-con-notificacion.component';

describe('TextoConNotificacionComponent', () => {
  let component: TextoConNotificacionComponent;
  let fixture: ComponentFixture<TextoConNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoConNotificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextoConNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
