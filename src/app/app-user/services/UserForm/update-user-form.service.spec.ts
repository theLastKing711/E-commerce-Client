import { TestBed } from '@angular/core/testing';

import { UpdateUserFormService } from './update-user-form.service';

describe('UpdateUserFormService', () => {
  let service: UpdateUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
