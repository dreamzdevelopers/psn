
import { Injectable, NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RouterModule, Routes, Router, ActivatedRoute, NavigationStart, NavigationEnd, ParamMap } from '@angular/router';

import { HttpHeaders, HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { promise } from 'protractor';
import { Config } from './app.config';

import { AuthService } from './auth.service';

import * as Rx from 'rxjs/Observable';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class Apps {
  env: string;
  api: any;
  info: any;
  options: any;
  headers: any;
  token: any;
  httpRequest = new HttpParams();
  login: any;
  view: any;
  user: any;
  countries;
  class={'ERR':'danger','WAR':'warning','INF':'info','RES':'success'};
  storage = window.localStorage;
  constructor(public config: Config, private http: HttpClient,  public router: Router, public route: ActivatedRoute, private titleService: Title){
    
    this.env = config.getEnv('env');
    this.info = config.getEnv('info');
    this.api = config.get('api');
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authkey', this.api.key).set('AuthHash', this.api.hash);
    this.options = {headers: this.headers};
    // this.options = {headers: this.headers, responseType:'text'};
    this.token = config.token;
    this.user = config.Authenticate;
    if(typeof(this.user.id)!=='undefined'){
        this.login = true;
    }else{
        this.login = false;
    }
  }
  ngbdt2dt(ngbdt){
    return new Date(ngbdt.year + '-' + ngbdt.month + '-' + ngbdt.day);
  }
  dt2ngbdt(dt){
    return {'year':dt.getFullYear(),'month':(dt.getMonth()+1),'day':dt.getDate()};
  }
  dt2ymd(dt){
    return dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate();
  }
  ngbdt2ymd(ngbdt){
    return ngbdt.year + '-' + ngbdt.month + '-' + ngbdt.day;
  }
  respERR(obj){
    let isErr;
    let v = Object.keys(obj);
    isErr = v[0];
    return (isErr == 'RES' || isErr == 'INF') ? false : true;
  }
  resptype(obj){
    let responseType;
    let v = Object.keys(obj);
    responseType = v[0];
    return responseType;
  }
  resp(obj){
    let response = [];
    let i = 0;
    Object.entries(obj).forEach((v)=>{
      if(i == 0){
        response.push(v[1]);
      }else{
        response.push(v[0],v[1]);
      }
    });
    return response;
  }
  validngbt(v){
    v = (v !== null) ? this.ngbdt2dt(v): null;
    if((v instanceof Date)&&((typeof(v)=='number')&&!isNaN(v))){
      return true;
    }else{
      return false;
    }
  }
  vartype(v){
    if(typeof(v) == 'number'){
      v = parseFloat(v.toString());
      return 'zero';
    }else if(typeof(v) == 'string' && v == ''){
      return 'emptystring';
    }else{
      if(v instanceof Date){
        return 'date';
      }else if(this.validngbt(v)){
        return 'ngdate';
      }else if(v==null){
        return 'null';
      }else{
        return typeof(v);
      }
    }
  }
  isEmpty(v){
    let can = ['null','zero','undefined','emptystring'];
    return can.indexOf(v) >= 0 ? true : false;
  }
  getResponse(action, params: any = null) {
    let req = this.httpRequest;
    req = req.set('action', action).set('token',this.token);
    
    if ( params !== null ) {
      Object.entries(params).forEach((param) => {
       
        if(typeof(param[0]) == 'string'){
          if(typeof(param[1]) == 'object'){
            req = req.set('data['+param[0]+']', JSON.stringify(param[1]));
          }else{
            if(typeof(param[1])=='string'){
              req = req.set(param[0], param[1]);
            }   
          }
        }
        
      });
    }
    return this.http.post(this.api.url, req, this.options).map(res => res);
  }
  getAuthResponse(action, params: any = null){
    this.reAuth();
    this.getResponse(action, params);
  }
  ishexdec(str)
  {
   let regexp = /^[0-9a-fA-F]+$/;
    if (regexp.test(str))
      {
        return true;
      }
    else
      {
        return false;
      }
  }
  reAuth(){
    this.config.Auth();
    this.token = this.config.token;
    this.user = this.config.Authenticate;
  }

  doLogin(credentials){
   // this.options = {headers: this.headers, responseType:'text'};
    return new Promise(resolve => this.getResponse('master::user::login',credentials).subscribe((res)=>{
      res = typeof(res) !== 'object' ? JSON.parse(res): res;
      
      if(typeof(res['xtoken'])!=='undefined'){
       
        this.storage.setItem('xtoken',res['xtoken']);
        this.config.xtoken = res['xtoken'];
        window.location.reload();
      }
        resolve(res);
    }));

  }
  getCountry(){
    let resp = new Promise((resolve)=>{
      this.getResponse('master::get::countries').subscribe((res)=>{
        resolve(res);
      });
    });
    resp.then((res)=>{
      let err = this.respERR(res);
      if(!err){
        this.countries = this.resp(res)[0];
      }
    });
  }
  toJSON(str): object{
    if(typeof(str)=='string'){
      return JSON.parse(str);
    }else{
      return str;
    }
  }
  toCode(str){
    return str.split(/[. //\-_]/).reduce((response,word)=> response+=word.slice(0,1),'').toUpperCase();
  }
  filterCode(str){
    return str.match(/[A-Za-z0-9]/g).join('').substring(0, 10).toUpperCase();
  }
  filterDigits(str){
    return str.match(/\d/g).join('');
  }
  filterDec(str){
    
    return str.match(/([0-9]+(\.[0-9]+)?)/g).join('');
  }
  filterCurrency(str){
    return parseFloat(this.filterDec(str)).toFixed(2);
  }
  doLogout(){
    this.options = {headers: this.headers, responseType:'text'};
    return new Promise(resolve => this.getResponse('master::user::logout').subscribe((res)=>{
        if(typeof(res)=='string'){
          res = JSON.parse(res);
        }
        const keys = Object.keys(res);
        if (typeof(keys[0]) !== 'undefined' && ( keys[0] === 'RES' || keys[0] === 'INF')) {
          this.storage.removeItem('xtoken');
          delete this.config.xtoken;
          this.config.Authenticate = {status:0};
          this.navigate(['/login']);
        }
        resolve(res);
    }));
  }
  navigate(val){
    this.router.navigate(val);

  }
  
}