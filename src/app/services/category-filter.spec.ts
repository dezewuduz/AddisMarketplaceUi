import { TestBed } from '@angular/core/testing';

import { CategoryFilter } from './category-filter';

describe('CategoryFilter', () => {
  let service: CategoryFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFilter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
