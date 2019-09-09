import { Component, OnInit } from '@angular/core';
import { Apps } from './../../app.apps';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionlist = [];
  transtype = ['','C','G'];
  status = {'ERR':'danger'};
  constructor(public app: Apps) {
    this.getStatus();
    this.getlistOfTransaction();
  }

  ngOnInit() {
    
  }
  getStatus(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::transtatus').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let restype = this.app.resptype(res);
      let reserr = this.app.respERR(res);
      let response = this.app.resp(res);
      if(!reserr){
          
          Object.entries(response[0]).forEach((v,i)=>{
            this.status[v[1]['id']] = {"name":v[1]['name'],"type":v[1]['type']};
            
          });
      }else{
          console.log(res);
      }
      
    });
  }
  getlistOfTransaction(){
    let resp = new Promise((resolve)=>{
      this.app.getResponse('master::get::transactions').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let restype = this.app.resptype(res);
      let reserr = this.app.respERR(res);
      let response = this.app.resp(res);
      if(!reserr){
          this.transactionlist = response[0];
      }else{
          console.log(res);
      }
      
    });
  }

}