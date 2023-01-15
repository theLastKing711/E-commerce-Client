import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountDialogComponent } from './add-discount-dialog.component';

describe('AddDiscountDialogComponent', () => {
  let component: AddDiscountDialogComponent;
  let fixture: ComponentFixture<AddDiscountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscountDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiscountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
