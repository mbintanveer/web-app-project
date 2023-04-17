import { TestBed } from '@angular/core/testing';

import {AppointmentService} from './patient-appointment.service';
import { PatientService } from './doctor-patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
