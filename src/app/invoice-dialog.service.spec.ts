import { TestBed } from '@angular/core/testing';

import { InvoiceDialogService } from './invoice-dialog.service';

describe('InvoiceDialogService', () => {
  let service: InvoiceDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
