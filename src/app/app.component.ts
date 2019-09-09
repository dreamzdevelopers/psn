import { Component, Inject, Renderer2  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Apps } from './app.apps';
import { TitleService } from './title.service';
import { RouterModule, Routes, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  App;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, public Apps: Apps, private titleService: TitleService){
    this.App = Apps;
  }
  addScript(src){
    let script;
    Object.entries(src).forEach((sc) => {
      script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = sc[1];
      this.renderer.appendChild(this.document.body, script);
      script = null;
    });
  }
  ngOnInit(): void {
    this.titleService.boot();
    this.renderer.setAttribute(this.document.body,'id','page-top');
    this.addScript([
      
        "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js",
        "http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.js",
       "assets/admin.js"
    ]);
    
  }

}
