import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSpectatorsComponent } from './gestion-spectators.component';

describe('GestionSpectatorsComponent', () => {
  let component: GestionSpectatorsComponent;
  let fixture: ComponentFixture<GestionSpectatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSpectatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSpectatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
