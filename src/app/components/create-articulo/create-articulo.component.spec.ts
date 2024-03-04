import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticuloComponent } from './create-articulo.component';

describe('CreateArticuloComponent', () => {
  let component: CreateArticuloComponent;
  let fixture: ComponentFixture<CreateArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
