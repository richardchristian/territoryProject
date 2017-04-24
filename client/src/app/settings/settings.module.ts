import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOptions } from '../custom-toast.options';
// Services
import { ProclaimerService } from '../_services/proclaimer.service';
import { TerritoryService } from '../_services/territory.service';

import { SettingsComponent } from './settings.component';
import { SettingsProclaimerComponent } from './settings-proclaimer.component';
import { SettingsTerritoryComponent } from './settings-territory.component';
import { SettingsProclaimerDialogComponent } from './dialogs/settings-proclaimer-dialog.component';
import { SettingsTerritoryDialogComponent } from './dialogs/settings-territory-dialog.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Modal
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        ModalModule.forRoot(),
        ToastModule.forRoot(),
        RouterModule.forChild([{
            path: '',
            component: SettingsComponent
        }])

    ],
    declarations: [
        SettingsComponent,
        SettingsProclaimerComponent,
        SettingsTerritoryComponent,
        SettingsProclaimerDialogComponent,
        SettingsTerritoryDialogComponent

    ],
    exports: [],
    providers: [{ provide: ToastOptions, useClass: CustomToastOptions },
    ],
    bootstrap: []
})
export class SettingsModule { }
