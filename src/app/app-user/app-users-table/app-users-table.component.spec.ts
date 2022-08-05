import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsersTableComponent } from './app-users-table.component';

describe('AppUsersTableComponent', () => {
  let component: AppUsersTableComponent;
  let fixture: ComponentFixture<AppUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUsersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
