import { TestBed } from '@angular/core/testing';

import { AttemptServiceService } from './attempt-service.service';

describe('AttemptServiceService', () => {
  let service: AttemptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
