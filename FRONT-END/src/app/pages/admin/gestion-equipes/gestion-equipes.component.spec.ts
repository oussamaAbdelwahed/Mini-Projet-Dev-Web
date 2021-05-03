import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEquipesComponent } from './gestion-equipes.component';

describe('GestionEquipesComponent', () => {
  let component: GestionEquipesComponent;
  let fixture: ComponentFixture<GestionEquipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEquipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEquipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
