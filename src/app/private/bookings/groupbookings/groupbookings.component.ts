import { Component, OnInit } from '@angular/core';
import { Apps } from './../../../app.apps';
@Component({
  selector: 'app-groupbookings',
  templateUrl: './groupbookings.component.html',
  styleUrls: ['./groupbookings.component.css']
})
export class GroupbookingsComponent implements OnInit {
  bookings = [];
  status = {
    '-1':{'class':'danger','text':'Rejected/Cancelled'},
    '0':{'class':'info','text':'Waiting'},
    '1':{'class':'primary','text':'Open'},
    '2':{'class':'success','text':'Closed'},
  };
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getGrpBooking();
  }
  
  getGrpBooking(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::groupbookings').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let err = this.app.respERR(res);
      let response = this.app.resp(res);
      if(!err){
        this.bookings = response[0];
      }
      console.log(this.bookings);
    });
  }
}