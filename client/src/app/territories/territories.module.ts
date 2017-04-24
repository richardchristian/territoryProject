import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Toast
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOptions } from '../custom-toast.options';

import { SelectModule } from 'ng2-select';

import { TerritoriesComponent } from './territories.component';
import { TerritoriesIssueComponent } from './territories-issue.component';
import { TerritoriesRetractionComponent } from './territories-retraction.component';

import { TerritoriesRoutingModule } from './territories-routing.module';

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
    TerritoriesIssueComponent,
    TerritoriesRetractionComponent
  ],
  providers: [{ provide: ToastOptions, useClass: CustomToastOptions }]
})
export class TerritoriesModule { }
