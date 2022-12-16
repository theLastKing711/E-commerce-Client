import { TestBed } from '@angular/core/testing';

import { TableSearchService } from './table-search.service';

describe('TableSearchService', () => {
  let service: TableSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
