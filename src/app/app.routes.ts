import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders  } from '@angular/core';

import { RouterModule, Routes, CanActivate  } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
export let appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { 
    path: 'adminslog',
    component: AdminslogComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Admin\'s Log'}
  },
  { 
    path: 'userslog',
    component: UserslogComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'User\'s Log'}
  },
  { 
    path: 'globals',
    component: GlobalsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Site Global Settings'}
  },
  { 
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Site Administrators'}
  },
  { 
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Fronend Users'}
  },
  { 
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Trasactions'}
  },
  { 
    path: 'groupbookings',
    component: GroupbookingsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Group Bookings'}
  },
  { 
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Bookings'}
  },
  { 
    path: 'roomsquota',
    component: RoomsquotaComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Rooms Quota'}
  },
  { 
    path: 'roomstype',
    component: RoomstypeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Rooms Type'}
  },
  { 
    path: 'dailyquota',
    component: DailyquotaComponent,
    canActivate: [AuthGuard],
    
    data: { title: 'Daily Quota'}
  },
  { 
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Dashboard'}
  },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Profile'}
  },
  { 
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Pages'}
  },
  { 
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Settings'}
  },
  { 
    path: 'responses',
    component: ResponsesComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'Settings'}
  },
  { 
    path: 'userlog',
    component: UserlogComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: 'User Log'}
  },
  { 
    path:'notfound',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: { title: '404 - Page Not Found'}
  },
  { path: '**', redirectTo: 'notfound' }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});

