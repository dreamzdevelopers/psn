import { Component, OnInit } from '@angular/core';
import { Apps } from './../../../app.apps';
declare var $ : any;
@Component({
  selector: 'app-roomstype',
  templateUrl: './roomstype.component.html',
  styleUrls: ['./roomstype.component.css']
})

export class RoomstypeComponent implements OnInit {
  
  _new: any = [];
  rooms: any = [];
  changed = false;
  changeData: any = [];
  updated;
  newsaved: any;
  notification: any;
  validnew = false;
  constructor(public app: Apps) {
    this.roomlist();
  }
  roomlist(){
    
    let httpResp = new Promise((resolve)=>{
      this.app.getResponse("master::get::roomlist").subscribe((res)=>{
        resolve(res);
      });
    });
    httpResp.then((res: Response)=>{
      //res = this.app.toJSON(res);
      console.log(res);
      this.rooms = res;
    });
  }
  ngOnInit() {
    this._new.roomcode = '';
    this._new.roomtype = '';
    this._new.detail = '';
    this._new.rent = '';
    this._new.available = '';
    this._new.status = false;
    this.notification = [];
  }
  changeRoom(i = null, val = null){
    
      this.changed = true;
      Object.entries(this.rooms[i]).forEach((param)=>{
        if(param[1] == null || param[1] == '' && ( typeof(param[1])!=='boolean' )){
          console.log(typeof(param[1]));
          this.changed = false;
          return;
        }
      });
      if(this.changed){
          this.rooms[i]['code'] = this.app.filterCode(this.rooms[i]['code'].toString());
          this.rooms[i]['rent'] = this.app.filterCurrency(this.rooms[i]['rent'].toString());
          this.rooms[i]['available'] = this.app.filterDigits(this.rooms[i]['available'].toString());
          this.changeData[i] = this.rooms[i];
      }else{
        this.changeData.splice(i,1);
      }
      
    console.log(this.changeData);
  }
  newRoom(){
    if(typeof(this._new.roomtype)!=='undefined'){
      this._new.roomcode = this.app.toCode(this._new.roomtype);
    }
    
    this.validnew = true;
    Object.entries(this._new).forEach((param)=>{
        if(param[1] == null || param[1] == '' && ( typeof(param[1])!=='boolean' )){
          console.log(typeof(param[1]));
          this.validnew = false;
          return;
        }
      });
    
  }
  saveNew(){
    if(this.validnew){
      let httpResp = new Promise((resolve)=>{
        this.app.getResponse("master::save::newroom", this._new).subscribe((res)=>{
          resolve(res);
        });
      });
      httpResp.then((res: Response)=>{
        //res = this.app.toJSON(res);
        console.log(res);
        this.newsaved = res;
        let keys = Object.keys(res);
        console.log(res[keys[0]]);
        this.notification.respType = keys[0];
        this.notification.resp = res[keys[0]];
        if(keys[0]=='RES'){
            $('#newRoom').modal('hide');
            this.roomlist();
        }
        setTimeout(()=>{
          this.newsaved = false;
        },2000);
      });
    }
    
  }
  deleteRoom(i){
    //console.log(this.rooms[i]);
    let confirm = window.confirm('Are you sure to delete the room? It may affect booking data. You may disable instead of delete.');
    if(confirm){
      
      let httpResp = new Promise((resolve)=>{
        this.app.getResponse("master::delete::room", this.rooms[i]).subscribe((res)=>{
          resolve(res);
        });
      });
      httpResp.then((res: Response)=>{
        //res = this.app.toJSON(res);
        console.log(res);
        this.newsaved = res;
        let keys = Object.keys(res);
        console.log(res[keys[0]]);
        this.notification.respType = keys[0];
        this.notification.resp = res[keys[0]];
        
        setTimeout(()=>{
          this.newsaved = false;
          this.rooms.splice(i,1);
        },2000);
      });
    }
  }
  saveChanges(){
    
    let httpResp = new Promise((resolve)=>{
      this.app.getResponse("master::save::rooms", this.changeData).subscribe((res)=>{
        resolve(res);
      });
    });
    httpResp.then((res: Response)=>{
      //res = this.app.toJSON(res);
      console.log(res);
      this.updated = res;
      setTimeout(()=>{
        this.updated = false;
        this.changed = false;
      },2000);
    });
  }
}