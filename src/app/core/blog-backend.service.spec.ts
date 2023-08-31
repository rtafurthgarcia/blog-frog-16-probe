import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BlogBackendService } from './blog-backend.service';

describe('BlogDataService', () => {
  let service: BlogBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BlogBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
