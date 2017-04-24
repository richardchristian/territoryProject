import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { SettingsProclaimerComponent } from './settings-proclaimer.component';
import { SettingsTerritoryComponent } from './settings-territory.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {

    constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }
}
