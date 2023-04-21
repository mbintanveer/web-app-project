import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrescriptionsListComponent } from './prescriptions-list.component';

describe('PrescriptionsListComponent', () => {
  let component: PrescriptionsListComponent;
  let fixture: ComponentFixture<PrescriptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionsListComponent ],
      imports: [ NgxPaginationModule ],
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
