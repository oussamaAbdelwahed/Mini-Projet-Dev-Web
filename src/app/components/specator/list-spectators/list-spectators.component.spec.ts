import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpectatorsComponent } from './list-spectators.component';

describe('ListSpectatorsComponent', () => {
  let component: ListSpectatorsComponent;
  let fixture: ComponentFixture<ListSpectatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSpectatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpectatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
