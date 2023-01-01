import { TestBed } from '@angular/core/testing';

import { DeleteConfirmationDialogService } from './delete-confirmation-dialog.service';

describe('DeleteConfirmationDialogService', () => {
  let service: DeleteConfirmationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteConfirmationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
