import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeccionComponent } from './create-seccion.component';

describe('CreateSeccionComponent', () => {
  let component: CreateSeccionComponent;
  let fixture: ComponentFixture<CreateSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
