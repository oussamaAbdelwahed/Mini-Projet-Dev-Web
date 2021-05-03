import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpectatorComponent } from './show-spectator.component';

describe('ShowSpectatorComponent', () => {
  let component: ShowSpectatorComponent;
  let fixture: ComponentFixture<ShowSpectatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSpectatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSpectatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
