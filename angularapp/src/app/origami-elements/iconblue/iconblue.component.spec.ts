import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconblueComponent } from './iconblue.component';

describe('IconblueComponent', () => {
  let component: IconblueComponent;
  let fixture: ComponentFixture<IconblueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconblueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconblueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
