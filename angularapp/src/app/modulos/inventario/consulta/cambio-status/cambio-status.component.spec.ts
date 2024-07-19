import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioStatusComponent } from './cambio-status.component';

describe('CambioStatusComponent', () => {
  let component: CambioStatusComponent;
  let fixture: ComponentFixture<CambioStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
