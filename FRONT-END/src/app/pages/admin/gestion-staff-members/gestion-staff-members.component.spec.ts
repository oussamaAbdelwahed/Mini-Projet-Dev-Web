import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStaffMembersComponent } from './gestion-staff-members.component';

describe('GestionStaffMembersComponent', () => {
  let component: GestionStaffMembersComponent;
  let fixture: ComponentFixture<GestionStaffMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionStaffMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionStaffMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
