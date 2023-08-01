import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterColumnsComponent } from './table-filter-columns.component';

describe('TableFilterColumnsComponent', () => {
  let component: TableFilterColumnsComponent;
  let fixture: ComponentFixture<TableFilterColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFilterColumnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFilterColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
