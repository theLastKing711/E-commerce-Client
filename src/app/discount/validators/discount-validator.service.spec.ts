import { TestBed } from '@angular/core/testing';

import { DiscountValidatorService } from './discount-validator.service';

describe('DiscountValidatorService', () => {
  let service: DiscountValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
