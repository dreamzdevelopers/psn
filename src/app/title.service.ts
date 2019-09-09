import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Config } from './app.config';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  default_title = 'Dreamzlive Production';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private title: Title, private config: Config
  ) { const info = config.getEnv('info'); this.default_title = info.name; }

  boot() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activeRoute),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        return data && data.title ? `${this.default_title} • ${data.title}` : this.default_title;
      })
    ).subscribe((current_title) => this.title.setTitle(current_title));
  }
}