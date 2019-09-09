import { Injectable } from '@angular/core';
import { Config } from './app.config';

import { promise } from 'protractor';
@Injectable({ providedIn: 'root' })
export class AuthService{
  user;
  islogin;
  constructor(public config: Config) { }
  ishexdec(str)
  {
   let regexp = /^[0-9a-fA-F]+$/;
    if (regexp.test(str) && (str.length % 2) == 0)
      {
        return true;
      }
    else
      {
        return false;
      }
  }
  public Authenticate(){
   this.user = this.config.Authenticate;
   let token = this.ishexdec(this.config.xtoken);
   
    if(this.user.status > 0 && token){
      this.islogin = true;
    }else{
      this.islogin = false;
    }
    
  }

}