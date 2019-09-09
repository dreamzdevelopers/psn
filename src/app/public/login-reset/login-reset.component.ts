import { Component, OnInit } from '@angular/core';

import { Apps } from './../../app.apps';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.css']
})
export class LoginResetComponent implements OnInit {

 loginForm: FormGroup;
 valid: boolean = false;
  constructor(private Apps: Apps, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
          'user': [null,  [Validators.minLength(4), Validators.required ]]
          
        });
   }
 get user() { return this.loginForm.get('user'); }
  ngOnInit() {
  }
  submitForm() {
    let credentials = this.loginForm.value;
    console.log(credentials);
  }
  flipcard(cardview: String){
    this.Apps.view = cardview;
  }
}