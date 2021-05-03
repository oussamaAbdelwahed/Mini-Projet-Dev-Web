import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionToursComponent } from './gestion-tours.component';

describe('GestionToursComponent', () => {
  let component: GestionToursComponent;
  let fixture: ComponentFixture<GestionToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
