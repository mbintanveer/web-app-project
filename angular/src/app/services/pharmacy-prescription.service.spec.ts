import { TestBed } from '@angular/core/testing';

import {DoctorPrescriptionService} from './doctor-prescription.service';

describe('PrescriptionService', () => {
  let service: DoctorPrescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorPrescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
