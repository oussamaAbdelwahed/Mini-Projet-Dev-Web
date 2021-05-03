import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectatorDashboardComponent } from './spectator-dashboard.component';

describe('SpectatorDashboardComponent', () => {
  let component: SpectatorDashboardComponent;
  let fixture: ComponentFixture<SpectatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectatorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
