import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WavesModule, TableModule, IconsModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Apps } from './app.apps';
import { appRouting } from './app.routes';
import { LoginComponent } from './login/login.component';
import { LoginComponent as LoginTemplate } from './public/login/login.component';
import { LoginResetComponent } from './public/login-reset/login-reset.component';

import { Config } from './app.config';
import { AuthService } from './auth.service';
import { TitleService } from './title.service';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './private/navigation/navigation.component';
import { TopbarComponent } from './private/topbar/topbar.component';
import { NotFoundComponent } from './private/not-found/not-found.component';
import { ProfileComponent } from './private/profile/profile.component';
import { DailyquotaComponent } from './private/rooms/dailyquota/dailyquota.component';
import { RoomstypeComponent } from './private/rooms/roomstype/roomstype.component';
import { RoomsquotaComponent } from './private/rooms/roomsquota/roomsquota.component';
import { BookingsComponent } from './private/bookings/bookings/bookings.component';
import { GroupbookingsComponent } from './private/bookings/groupbookings/groupbookings.component';
import { TransactionsComponent } from './private/transactions/transactions.component';
import { UsersComponent } from './private/users/users.component';
import { AdminsComponent } from './private/admins/admins.component';
import { SettingsComponent } from './private/settings/settings.component';
import { GlobalsComponent } from './private/globals/globals.component';
import { ResponsesComponent } from './private/responses/responses.component';
import { UserslogComponent } from './private/userslog/userslog.component';
import { AdminslogComponent } from './private/adminslog/adminslog.component';
import { UserlogComponent } from './private/userlog/userlog.component';
import { PagesComponent } from './private/pages/pages.component';
export function getConfig(config:Config){
  return () => config.load()
}
export function getAuth(config:Config){
  return () => config.Auth();
}
@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, appRouting, WavesModule, TableModule, IconsModule ],
  declarations: [ AppComponent, LoginComponent, LoginTemplate, LoginResetComponent, DashboardComponent, NavigationComponent, TopbarComponent, NotFoundComponent, ProfileComponent, DailyquotaComponent, RoomstypeComponent, RoomsquotaComponent, BookingsComponent, GroupbookingsComponent, TransactionsComponent, UsersComponent, AdminsComponent, SettingsComponent, GlobalsComponent, UserslogComponent, AdminslogComponent, UserlogComponent, PagesComponent, ResponsesComponent ],
  providers: [ 
    Config, Apps, TitleService,
    AuthService,
    AuthGuardService,
    { provide: APP_INITIALIZER, useFactory: getConfig, deps: [Config], multi: true },
     { provide: APP_INITIALIZER, useFactory: getAuth, deps: [Config], multi: true },
   
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
  
}
