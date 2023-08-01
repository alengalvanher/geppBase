import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPastillaComponent } from './select-pastilla.component';

describe('SelectPastillaComponent', () => {
  let component: SelectPastillaComponent;
  let fixture: ComponentFixture<SelectPastillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPastillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPastillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
