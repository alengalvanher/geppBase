import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorNeumaticoIndividualComponent } from './editor-neumatico-individual.component';

describe('EditorNeumaticoIndividualComponent', () => {
  let component: EditorNeumaticoIndividualComponent;
  let fixture: ComponentFixture<EditorNeumaticoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorNeumaticoIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorNeumaticoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
