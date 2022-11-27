import { Component, OnInit } from '@angular/core';
import { Receiving } from 'src/app/models/receiving.model';
import { ReceivingService } from 'src/app/services/receiving.service';


@Component({
  selector: 'app-receiving-list',
  templateUrl: './receivings-list.component.html',
  styleUrls: ['./receivings-list.component.css']
})


export class ReceivingsListComponent implements OnInit {

  receivings?: any;
  receiving_description=''
  currentReceiving: Receiving = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  tableSize = 10;
  
  
  constructor(private receivingService: ReceivingService) { }

  ngOnInit(): void {
    this.retrieveReceivings();
  }

  
  retrieveReceivings(): void {
    this.receivingService.getAll()
      .subscribe(
        data => {
          this.receivings = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  refreshList(): void {
    this.retrieveReceivings();
    this.currentReceiving = {};
    this.currentIndex = -1;
  }

  tabSize(event:any){
    this.page = event;
    //this.retrieveClients();
  }  

  tableData(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrieveReceivings();
  } 

  setActiveReceiving(receiving: Receiving, index: number): void {
    this.currentReceiving =receiving;
    this.currentIndex = index;
  }

  searchReceivings(): void {
    this.currentReceiving = {};
    this.currentIndex = -1;

    this.receivingService.findByReceivingDescription(this.receiving_description)
      .subscribe(
        data => {
          this.receivings = data;
          this.page=1
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}


