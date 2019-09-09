import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable()
export class Config {
 private _config: Object;
 private _env: Object;
 public Authenticate: any;
 token;
 xtoken;
 options;
 storage = window.localStorage;
 constructor(private http: HttpClient) {
   //this.load();
   //console.log(this._config);
   
 }

load() {
 return new Promise((resolve, reject) => {
   
   this.http.get('../assets/env.json')
   .map(res => res)
   .subscribe((env_data: Object) => {
     
     this._env = env_data;
     if(typeof(env_data['env'])=='string'){
      this.http.get('../assets/' + env_data['env'] + '.json')
        .map(res => res)
        .subscribe((data) => {
          this._config = data;
          let headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authkey', data['api'].key).set('AuthHash', data['api'].hash);
          this.options = {headers: headers};
          let httpRequest = new HttpParams().set('action','request::token');
          
          let crxf = this.storage.getItem('crxf');
          if(crxf == null){
            this.http.post(data['api'].url, httpRequest, this.options)
            .map(res => res)
            .subscribe((pdata)=>{
              this.token = pdata['token'];
              this.storage.setItem('crxf',this.token);
  
            });
          }else{
            this.token = crxf;
            this.xtoken = this.storage.getItem('xtoken');
            resolve(true);
          }
        });
     }
     
   });
 });
}
Auth(){
  return new Promise((resolve, reject)=>
  {
     let rtimer = setInterval(()=>{
       if(typeof(this._config)!=='undefined'){
          this.getResponse("master::check::login").subscribe(res => {
            this.Authenticate = res;
            if(typeof(res)!=='undefined'){
                clearInterval(rtimer);
            }
            resolve();
          });
       }
       
     },1000);
     
   });
}
getResponse(action, params: any = null) {
  let req = new HttpParams();
  let headers = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Authkey', this._config['api'].key).set('AuthHash', this._config['api'].hash);
  this.options = {headers: headers};
  req = req.set('action', action).set('token',this.token).set('xtoken',encodeURI(btoa(this.xtoken)));
  
  if ( params !== null ) {

    Object.entries(params).forEach((param) => {
      if(typeof(param[0]) == 'string' && typeof(param[1])=='string'){
        req = req.set(param[0], param[1]);
      }
    });
  }
  return this.http.post(this._config['api'].url, req, this.options).map(res => res);
}

 getEnv(key: any) {
   return this._env[key];
 }
 get(key: any) {
   return this._config[key];
 }
};