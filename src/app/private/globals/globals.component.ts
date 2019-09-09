import { Component, OnInit } from '@angular/core';
import { Apps } from './../../app.apps';
@Component({
  selector: 'app-globals',
  templateUrl: './globals.component.html',
  styleUrls: ['./globals.component.css']
})
export class GlobalsComponent implements OnInit {
  globals = [];
  changed = false;
  changesApplied = false;
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getGlobals();
  }
  setGlobals(i){
    this.changed = true;
    console.log(this.globals[i]);
  }
  getGlobals(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::globals').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let resperr = this.app.respERR(res);
      if(!resperr){
        this.globals = this.app.resp(res)[0];
      }
      console.log(res);
    });
  }
}