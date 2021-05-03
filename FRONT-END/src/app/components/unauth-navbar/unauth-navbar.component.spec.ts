import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthNavbarComponent } from './unauth-navbar.component';

describe('UnauthNavbarComponent', () => {
  let component: UnauthNavbarComponent;
  let fixture: ComponentFixture<UnauthNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
