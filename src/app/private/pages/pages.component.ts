import { Component, OnInit } from '@angular/core';
import { Apps } from './../../app.apps';
import * as jQuery from 'jquery';
export var $:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  pages;
  status = [{'class':'badge badge-info','text':'Draft'},{'class':'badge badge-success','text':'Published'}];
  constructor(public app: Apps) { $ = jQuery;}

  ngOnInit() {
    $('[data-toggle=\"tooltip\"]').each(function(){$(this).tooltip();});
    this.getPages();
  }
  getPages(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::pages').subscribe((res)=>{resolve(res);});
    });
    resp.then((res)=>{
      let err = this.app.respERR(res);
      if(!err){
        this.pages = this.app.resp(res)[0];
        console.log(this.pages);
      }
    })
  }

}
