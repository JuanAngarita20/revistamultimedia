import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEdicionComponent } from './list-edicion.component';

describe('ListEdicionComponent', () => {
  let component: ListEdicionComponent;
  let fixture: ComponentFixture<ListEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEdicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
