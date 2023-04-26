import { TestBed } from '@angular/core/testing';

import {PharmacyPrescriptionService} from './pharmacy-prescription.service';

describe('PrescriptionService', () => {
  let service: PharmacyPrescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyPrescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
