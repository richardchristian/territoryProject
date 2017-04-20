import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Services
import { ProclaimerService } from '../_services/proclaimer.service';

import { SettingsComponent } from './settings.component';
import { SettingsProclaimerComponent } from './settings-proclaimer.component';
import { SettingsTerritoryComponent } from './settings-territory.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        RouterModule.forChild([{
            path: '',
            component: SettingsComponent
        }])
    ],
    declarations: [
        SettingsComponent,
        SettingsTerritoryComponent,
        SettingsProclaimerComponent,
        SettingsTerritoryComponent
    ],
    exports: [],
    providers: [
        ProclaimerService
    ]
})
export class SettingsModule { }
