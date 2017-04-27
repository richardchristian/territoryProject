import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerritoriesComponent } from './territories.component';


const routes: Routes = [
  {
    path: '',
    component: TerritoriesComponent,
    data: {
      title: 'Gebiete'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerritoriesRoutingModule { }
