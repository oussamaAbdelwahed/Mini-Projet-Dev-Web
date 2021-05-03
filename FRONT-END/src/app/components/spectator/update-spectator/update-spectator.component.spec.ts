import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpectatorComponent } from './update-spectator.component';

describe('UpdateSpectatorComponent', () => {
  let component: UpdateSpectatorComponent;
  let fixture: ComponentFixture<UpdateSpectatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpectatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpectatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
