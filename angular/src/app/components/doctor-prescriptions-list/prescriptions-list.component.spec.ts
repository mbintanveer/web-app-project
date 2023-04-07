import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPrescriptionsListComponent } from './prescriptions-list.component';

describe('DoctorPrescriptionsListComponent', () => {
  let component: DoctorPrescriptionsListComponent;
  let fixture: ComponentFixture<DoctorPrescriptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPrescriptionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPrescriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
