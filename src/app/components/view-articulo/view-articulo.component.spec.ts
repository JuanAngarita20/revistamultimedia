import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticuloComponent } from './view-articulo.component';

describe('ViewArticuloComponent', () => {
  let component: ViewArticuloComponent;
  let fixture: ComponentFixture<ViewArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
