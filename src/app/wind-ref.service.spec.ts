import { TestBed } from '@angular/core/testing';

import { WindRefService } from './wind-ref.service';

describe('WindRefService', () => {
  let service: WindRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
