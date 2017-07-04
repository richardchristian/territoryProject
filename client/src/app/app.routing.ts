import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'territories',
        loadChildren: './territories/territories.module#TerritoriesModule'
      },
      {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule'
      }
    ]
  },
  {
    path: 'settings',
    component: FullLayoutComponent,
    data: {
      title: 'Einstellungen'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './settings/settings.module#SettingsModule',
      }
    ]
  },
  {
    path: 'users',
    component: FullLayoutComponent,
    data: {
      title: 'Benutzer'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './users/users.module#UsersModule',
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/404'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
