import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStadiumComponent } from './gestion-stadium.component';

describe('GestionStadiumComponent', () => {
  let component: GestionStadiumComponent;
  let fixture: ComponentFixture<GestionStadiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionStadiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
