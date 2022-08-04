import { TestBed } from '@angular/core/testing';

import { MapStatsDataService } from './map-stats-data.service';

describe('MapStatsDataService', () => {
  let service: MapStatsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStatsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
