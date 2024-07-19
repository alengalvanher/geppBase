import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelProvidersLargeComponent } from './fuel-providers-large.component';

describe('FuelProvidersLargeComponent', () => {
  let component: FuelProvidersLargeComponent;
  let fixture: ComponentFixture<FuelProvidersLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelProvidersLargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelProvidersLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
