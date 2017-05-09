import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardDoughnutComponent } from './dashboard-doughnut.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ColorService } from '../_services/color.service';
import { ReportService } from '../_services/report.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [
    DashboardComponent,
    DashboardDoughnutComponent,
  ],
  providers: [
    ColorService,
    ReportService
  ]
})
export class DashboardModule { }
