import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelProvidersComponent } from './fuel-providers.component';

describe('FuelProvidersComponent', () => {
  let component: FuelProvidersComponent;
  let fixture: ComponentFixture<FuelProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
