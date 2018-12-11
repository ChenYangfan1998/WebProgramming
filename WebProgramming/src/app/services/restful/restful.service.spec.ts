import { TestBed, inject } from '@angular/core/testing';

import { RestfulService } from './restful.service';

describe('RestfulService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestfulService]
    });
  });

  it('should be created', inject([RestfulService], (service: RestfulService) => {
    expect(service).toBeTruthy();
  }));
});
