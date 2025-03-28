import { TestBed } from '@angular/core/testing';

import { NpxPotionsFormService } from './npx-potions-form.service';

describe('NpxPotionsFormService', () => {
  let service: NpxPotionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpxPotionsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
