import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnAlmacenComponent } from './en-almacen.component';

describe('EnAlmacenComponent', () => {
  let component: EnAlmacenComponent;
  let fixture: ComponentFixture<EnAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnAlmacenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
