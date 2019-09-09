import { Component, OnInit } from '@angular/core';
import { Apps } from '../../../app.apps';
import { resolve } from 'url';


@Component({
  selector: 'app-roomsquota',
  templateUrl: './roomsquota.component.html',
  styleUrls: ['./roomsquota.component.css']
})
export class RoomsquotaComponent implements OnInit {
  quotas;
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getQuota();
  }

  getQuota(){
    let resp = new Promise((resolve) => {this.app.getResponse('master::get::quota').subscribe((res)=>{resolve(res);});});
    resp.then((res)=>{
      
      let err = this.app.respERR(res);
      if(!err){
        this.quotas = this.app.resp(res)[0];
      }
      console.log(this.app.resp(res)); 
    });
  }

}