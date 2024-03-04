import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEdicionComponent } from './create-edicion.component';

describe('CreateEdicionComponent', () => {
  let component: CreateEdicionComponent;
  let fixture: ComponentFixture<CreateEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEdicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
