import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarMilimetrajeComponent } from './cambiar-milimetraje.component';

describe('CambiarMilimetrajeComponent', () => {
  let component: CambiarMilimetrajeComponent;
  let fixture: ComponentFixture<CambiarMilimetrajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarMilimetrajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarMilimetrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
