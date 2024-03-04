import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeccionComponent } from './edit-seccion.component';

describe('EditSeccionComponent', () => {
  let component: EditSeccionComponent;
  let fixture: ComponentFixture<EditSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
