import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPrescriptionsListComponent } from './prescriptions-list.component';

describe('PharmacyPrescriptionsListComponent', () => {
  let component: PharmacyPrescriptionsListComponent;
  let fixture: ComponentFixture<PharmacyPrescriptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPrescriptionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPrescriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
