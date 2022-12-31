import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsTableComponent } from './invoice-details-table.component';

describe('InvoiceDetailsTableComponent', () => {
  let component: InvoiceDetailsTableComponent;
  let fixture: ComponentFixture<InvoiceDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
