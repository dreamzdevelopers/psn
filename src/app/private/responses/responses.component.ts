import { Component, OnInit } from '@angular/core';
import { Apps } from './../../app.apps';
@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  vars = [];
  changed = false;
  changesApplied = false;
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getGlobals();
  }
  setGlobals(i){
    this.changed = true;
    console.log(this.vars[i]);
  }
  getGlobals(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::responses').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let resperr = this.app.respERR(res);
      if(!resperr){
        this.vars = this.app.resp(res)[0];
      }
      console.log(res);
    });
  }
}