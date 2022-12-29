import { TestBed } from '@angular/core/testing';

import { BaseUserFormService } from './base-user-form.service';

describe('BaseUserFormService', () => {
  let service: BaseUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseUserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
