import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectatorSidebarComponent } from './spectator-sidebar.component';

describe('SpectatorSidebarComponent', () => {
  let component: SpectatorSidebarComponent;
  let fixture: ComponentFixture<SpectatorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectatorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectatorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
