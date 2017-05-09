import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Toast
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOptions } from '../custom-toast.options';

import { ReportsComponent } from './reports.component';
import { ReportsTerritoryCardComponent } from './reports-territorycard.component';

import { ReportsRoutingModule } from './reports-routing.module';

import { TerritoryService } from '../_services/territory.service';
import { ProclaimerService } from '../_services/proclaimer.service';
import { ProcessingDataService } from '../_services/processing-data.service';
import { ReportService } from '../_services/report.service';
import { ColorService } from '../_services/color.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,
    ToastModule.forRoot()
  ],
  declarations: [
    ReportsComponent,
    ReportsTerritoryCardComponent
  ],
  providers: [
    TerritoryService,
    ProclaimerService,
    ProcessingDataService,
    ReportService,
    ColorService,
    { provide: ToastOptions, useClass: CustomToastOptions }
  ]
})
export class ReportsModule { }
