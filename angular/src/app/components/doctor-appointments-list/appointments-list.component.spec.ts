import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentsListComponent } from './appointments-list.component';

describe('DoctorAppointmentsListComponent', () => {
  let component: DoctorAppointmentsListComponent;
  let fixture: ComponentFixture<DoctorAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
