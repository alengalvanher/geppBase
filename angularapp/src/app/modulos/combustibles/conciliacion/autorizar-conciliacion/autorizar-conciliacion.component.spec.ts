import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarConciliacionComponent } from './autorizar-conciliacion.component';

describe('AutorizarConciliacionComponent', () => {
  let component: AutorizarConciliacionComponent;
  let fixture: ComponentFixture<AutorizarConciliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizarConciliacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarConciliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
