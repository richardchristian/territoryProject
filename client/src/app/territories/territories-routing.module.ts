import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerritoriesComponent } from './territories.component';
import { TerritoriesLendComponent } from './territories-lend.component';
import { TerritoriesGetbackExtendComponent } from './territories-getback-extend.component';


const routes: Routes = [
  {
    path: '',
    component: TerritoriesComponent,
    data: {
      title: 'Gebiete'
    },
    children: [
      {
        path: 'lend',
        component: TerritoriesLendComponent,
        data: {
          title: 'Gebiet-Ausgabe'
        }
      },
      {
        path: 'getback-extend',
        component: TerritoriesGetbackExtendComponent,
        data: {
          title: 'Gebiet-Rücknahme'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerritoriesRoutingModule { }
