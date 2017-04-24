import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
    selector: 'app-settings-territory-dialog',
    templateUrl: 'settings-territory-dialog.component.html'
})
export class SettingsTerritoryDialogComponent {
    @ViewChild('infoModal') public infoModal: ModalDirective;

    constructor() { }

    show() {
        this.infoModal.show();
    }
    hide() {
        this.infoModal.hide();
    }
}
