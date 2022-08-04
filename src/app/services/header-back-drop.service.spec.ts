import { TestBed } from '@angular/core/testing';

import { HeaderBackDropService } from './header-back-drop.service';

describe('HeaderBackDropService', () => {
  let service: HeaderBackDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderBackDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
