import { TestBed } from '@angular/core/testing';

import { AppUserDialogService } from './app-user-dialog.service';

describe('AppUserDialogService', () => {
  let service: AppUserDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
