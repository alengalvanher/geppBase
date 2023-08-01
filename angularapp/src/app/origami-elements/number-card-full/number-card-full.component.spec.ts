import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCardFullComponent } from './number-card-full.component';

describe('NumberCardFullComponent', () => {
  let component: NumberCardFullComponent;
  let fixture: ComponentFixture<NumberCardFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberCardFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberCardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
