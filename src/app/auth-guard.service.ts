import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{
  
  constructor(private auth: AuthService,private router: Router) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.auth.Authenticate();
      console.log(this.auth.islogin);
      if(this.auth.islogin){
        
        return true;
      }
      this.router.navigate(['/login']);
      return false;
      
      
    // console.log(this.auth.isLogin);
    
  }
}