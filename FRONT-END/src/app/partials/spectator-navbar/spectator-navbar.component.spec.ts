import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectatorNavbarComponent } from './spectator-navbar.component';

describe('SpectatorNavbarComponent', () => {
  let component: SpectatorNavbarComponent;
  let fixture: ComponentFixture<SpectatorNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectatorNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectatorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
