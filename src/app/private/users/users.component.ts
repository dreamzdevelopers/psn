import { Component, OnInit } from '@angular/core';

import { Apps } from './../../app.apps';
import { isNull } from 'util';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users;
  total;
  page;
  pages;
  status = [{'class':'badge-warning','text':'Incomplete Profile'},{'class':'badge-success','text':'Active'},{'class':'badge-danger','text':'Blocked'}];
  constructor(public app: Apps) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(page = null){
    let param = isNull(page) ? {'page':1} : {'page':page};
    this.page = isNull(page) ? 1 : page;
    let response = new Promise((resolve)=>{
      this.app.getResponse('master::get::users', param).subscribe((res)=>{
        resolve(res);
      });
    });
    response.then((res)=>{
      let err = this.app.respERR(res);
      if(!err){
        this.users = this.app.resp(res)[0];
        this.total = this.app.resp(res)[1];
        this.pages = Math.floor(this.total/50) + 1;
        console.log(this.page);
      }
      console.log(this.app.resptype(res));
    });
  }
}