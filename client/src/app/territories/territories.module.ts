import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Toast
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOptions } from '../custom-toast.options';

import { SelectModule } from 'ng2-select';

import { TerritoriesComponent } from './territories.component';
import { TerritoriesLendComponent } from './territories-lend.component';
import { TerritoriesGetbackExtendComponent } from './territories-getback-extend.component';

import { TerritoriesRoutingModule } from './territories-routing.module';

import { TerritoryService } from '../_services/territory.service';
import { ProclaimerService } from '../_services/proclaimer.service';
import { ProcessingDataService } from '../_services/processing-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TerritoriesRoutingModule,
    ToastModule.forRoot(),
    SelectModule
  ],
  declarations: [
    TerritoriesComponent,
    TerritoriesLendComponent,
    TerritoriesGetbackExtendComponent
  ],
  providers: [
    TerritoryService,
    ProclaimerService,
    ProcessingDataService,
    { provide: ToastOptions, useClass: CustomToastOptions }
  ]
})
export class TerritoriesModule { }
