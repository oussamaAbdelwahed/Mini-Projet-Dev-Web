import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRefereeComponent } from './gestion-referee.component';

describe('GestionRefereeComponent', () => {
  let component: GestionRefereeComponent;
  let fixture: ComponentFixture<GestionRefereeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRefereeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
