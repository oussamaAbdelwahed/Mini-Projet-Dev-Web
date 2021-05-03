import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionJoueursComponent } from './gestion-joueurs.component';

describe('GestionJoueursComponent', () => {
  let component: GestionJoueursComponent;
  let fixture: ComponentFixture<GestionJoueursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionJoueursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionJoueursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
