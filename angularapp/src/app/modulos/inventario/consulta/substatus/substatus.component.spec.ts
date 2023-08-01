import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstatusComponent } from './substatus.component';

describe('SubstatusComponent', () => {
  let component: SubstatusComponent;
  let fixture: ComponentFixture<SubstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
