import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppUserDialogComponent } from './add-app-user-dialog.component';

describe('AddAppUserDialogComponent', () => {
  let component: AddAppUserDialogComponent;
  let fixture: ComponentFixture<AddAppUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
