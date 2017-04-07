import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UIRouterModule } from 'ui-router-ng2';


import { AdminComponent } from './admin.component';


import { STATES } from './admin.routes';

@NgModule({
    imports: [
        BrowserModule,

        UIRouterModule.forChild({
            states: STATES,
        }),
    ],
    declarations: [
        AdminComponent,
    ],
    exports: [
        AdminComponent,
    ],
})
export class AdminModule {}
