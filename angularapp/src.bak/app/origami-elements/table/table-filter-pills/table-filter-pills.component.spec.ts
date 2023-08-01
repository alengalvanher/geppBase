import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterPillsComponent } from './table-filter-pills.component';

describe('TableFilterPillsComponent', () => {
  let component: TableFilterPillsComponent;
  let fixture: ComponentFixture<TableFilterPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFilterPillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFilterPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
