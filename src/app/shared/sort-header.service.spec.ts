import { TestBed } from '@angular/core/testing';

import { SortHeaderService } from './sort-header.service';

describe('SortHeaderService', () => {
  let service: SortHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
