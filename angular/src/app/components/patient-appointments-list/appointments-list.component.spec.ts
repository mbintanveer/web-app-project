import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentsListComponent } from './appointments-list.component';

describe('PatientAppointmentsListComponent', () => {
  let component: PatientAppointmentsListComponent;
  let fixture: ComponentFixture<PatientAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppointmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
