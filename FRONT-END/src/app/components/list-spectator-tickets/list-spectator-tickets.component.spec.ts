import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpectatorTicketsComponent } from './list-spectator-tickets.component';

describe('ListSpectatorTicketsComponent', () => {
  let component: ListSpectatorTicketsComponent;
  let fixture: ComponentFixture<ListSpectatorTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSpectatorTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpectatorTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
