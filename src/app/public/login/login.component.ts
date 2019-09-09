import { Component, Inject } from '@angular/core';
import { Apps } from './../../app.apps';
import { AuthService } from './../../auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginForm: FormGroup;
 valid: boolean = false;
 loginResp;
 constructor(private Apps: Apps, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthService) {
        
        this.loginForm = this.fb.group({
          'user': [null,  [Validators.minLength(4), Validators.required ]],
          'pass': [null,  [Validators.minLength(4), Validators.required ] ]
        });

    //this.rForm = fb.group({'user' : [null, Validators.required], 'pass' : [null, Validators.required]});
    
  }
  get user() { return this.loginForm.get('user'); }
  get pass() { return this.loginForm.get('pass'); }
  submitForm() {
    let credentials = this.loginForm.value;
    this.Apps.doLogin(credentials).then(res => {
      if(typeof(res) == 'string'){
        res = JSON.parse(res);
      }
      const keys = Object.keys(res);
      let cls;
       cls = {
         'RES':'success',
         'INF':'info',
         'ERR':'danger',
         'WAR':'warning'
       }
        
          this.loginResp = {
             "type":cls[keys[0]],
             "text":res[keys[0]]
          };
          if ( keys[0] === 'RES' || keys[0] === 'INF') {
            
            this.Apps.config.Auth();
            let authuser = this.Apps.config.Authenticate;
            if(typeof(authuser.id)=='undefined'){
              this.loginResp.text = 'Loading...';
                setInterval(()=>{
                  
                    this.router.navigate(['']).then(nav=>{
                       
                    },err=>{
                      
                    });
                  
                    
                },3000);
                setTimeout(()=>{
                  this.loginResp.text = 'Server is unavailable or your ip has been blocked.';
                },5000);
            }
          }
    });
  }
  flipcard(cardview: String){
    this.Apps.view = cardview;
  }

}