import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerritoriesComponent } from './territories.component';
import { TerritoriesIssueComponent } from './territories-issue.component';
import { TerritoriesRetractionComponent } from './territories-retraction.component';


const routes: Routes = [
  {
    path: '',
    component: TerritoriesComponent,
    data: {
      title: 'Gebiete'
    },
    children: [
      {
        path: 'issue',
        component: TerritoriesIssueComponent,
        data: {
          title: 'Gebiet-Ausgabe'
        }
      },
      {
        path: 'retraction',
        component: TerritoriesRetractionComponent,
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
