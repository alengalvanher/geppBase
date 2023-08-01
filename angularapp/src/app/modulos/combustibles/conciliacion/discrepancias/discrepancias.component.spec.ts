import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepanciasComponent } from './discrepancias.component';

describe('DiscrepanciasComponent', () => {
  let component: DiscrepanciasComponent;
  let fixture: ComponentFixture<DiscrepanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscrepanciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscrepanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
