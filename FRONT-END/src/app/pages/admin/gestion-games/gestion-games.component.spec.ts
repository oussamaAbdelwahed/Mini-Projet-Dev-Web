import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGamesComponent } from './gestion-games.component';

describe('GestionGamesComponent', () => {
  let component: GestionGamesComponent;
  let fixture: ComponentFixture<GestionGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
