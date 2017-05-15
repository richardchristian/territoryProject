import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ReportsCurrentdataComponent } from './reports-currentdata.component';
import { ReportsTerritoryCardComponent } from './reports-territorycard.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    data: {
      title: 'Auswertungen'
    },
    children: [
      {
        path: 'territorycard',
        component: ReportsTerritoryCardComponent,
        data: {
          title: 'Gebietskarten'
        }
      },
      {
        path: 'currentoverview',
        component: ReportsCurrentdataComponent,
        data: {
          title: 'Aktuelle Übersicht'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
