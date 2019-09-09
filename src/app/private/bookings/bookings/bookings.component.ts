import { Component, OnInit } from '@angular/core';
import { Apps } from './../../../app.apps';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings = [];
  quotatype = [];
  status = [];
  
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getquotalist();
    this.getbkstatus();
    this.getBookings();
  }
  getbkstatus(){
    
    let httpResp = new Promise((resolve)=>{
      this.app.getResponse("master::get::bkstatus").subscribe((res)=>{
        resolve(res);
      });
    });
    httpResp.then((res: any)=>{
      res = this.app.toJSON(res);
      let err = this.app.respERR(res);
      let bk = [];
      if(!err){
        this.app.resp(res)[0].forEach((ele)=>{
         // console.log(ele);
          bk[ele.id] = {'class':this.app.class[ele.type], 'text':ele.name}
        });
      this.status = bk;
      //console.log(this.status);
      }
    });
  }
  getquotalist(){
    
    let httpResp = new Promise((resolve)=>{
      this.app.getResponse("master::get::quota").subscribe((res)=>{
        resolve(res);
      });
    });
    httpResp.then((res: any)=>{
      console.log(res);
      res = this.app.resp(res)[0];
      let qtype = [];
      res.forEach(element => {
        qtype[element.typeid] = element.typename;
        
      });
      this.quotatype = qtype;
     // console.log(this.quotatype);
    });
  }
  getBookings(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::bookings').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let err = this.app.respERR(res);
      let response = this.app.resp(res);
      if(!err){
          this.bookings = response[0];
      }
          //console.log(res);
      
      
    });
  }
}