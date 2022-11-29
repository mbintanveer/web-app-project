import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import { ActivatedRoute} from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  doctor_page = 1;
  vendor_page = 1;
  count = 0;
  doctor_tableSize = 10;
  vendor_tableSize = 10;
  tableSizesArr = [10];


  doctor_currentIndex = -1;
  vendor_currentIndex = -1;

  currentDoctor: Doctor = {
    doctor_id: '',
    doctor_name: '',}

  get_all_doctor_summary: any;
  get_all_vendor_summary:any;

  // Doctor_Summary ={
  //   doctor_name:'',
  //   get_one_month: 0,
  //   get_two_month: 0,
  //   get_three_month: 0,
  //   get_four_month: 0,
  //   get_total: 0,
  // }


  constructor(private doctorService: DoctorService,
    private vendorService: VendorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.retrieveReceivings(this.route.snapshot.params.id);
    this.get_all_doctor_summaries();
    this.get_all_vendor_summaries();
  }
  
  getDoctor(id: string): void {
    this.doctorService.get(id)
      .subscribe(
        data => {
          this.currentDoctor = data;
          console.log(this.currentDoctor);
        },
        error => {
          console.log(error);
        });
  }

  get_all_doctor_summaries(): void {
    this.doctorService.get_all_doctor_summaries()
      .subscribe(
        data => {
          this.get_all_doctor_summary = data;
          console.log(this.get_all_doctor_summary);
        },
        error => {
          console.log(error);
        });
  }

  get_all_vendor_summaries(): void {
    this.vendorService.get_all_vendor_summaries()
      .subscribe(
        data => {
          this.get_all_vendor_summary = data;
          console.log(this.get_all_vendor_summary);
        },
        error => {
          console.log(error);
        });
  }


  refreshList(): void {

    this.doctor_currentIndex = -1;
    this.vendor_currentIndex = -1;
  }

  
  tabSize_doctor(event:any){
    this.doctor_page = event;
  }  

  tabSize_vendor(event:any){
    this.vendor_page = event;
  }  

  tableData_doctor(event:any): void {
    this.doctor_tableSize = event.target.value;
    this.doctor_page = 1;
  } 

  tableData_vendor(event:any): void {
    this.vendor_tableSize = event.target.value;
    this.vendor_page = 1;
  } 


}
