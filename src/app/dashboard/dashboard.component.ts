import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apps } from '../app.apps';
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,public app: Apps) { }

  ngOnInit() {
  }

}