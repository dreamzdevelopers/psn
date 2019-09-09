import { Component, OnInit } from '@angular/core';
import { Apps } from './../../app.apps';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins;
  status = [{'class':'badge-danger','text':'Blocked'},{'class':'badge-success','text':'Active'}];
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getAdmins();
  }
  getAdmins(){
    let response = new Promise((resolve)=>{
      this.app.getResponse('master::get::admins').subscribe((res)=>{
        resolve(res);
      });
    });
    response.then((res)=>{
      let err = this.app.respERR(res);
      if(!err){
        this.admins = this.app.resp(res)[0];
      }
      console.log(res);
    });
  }
}