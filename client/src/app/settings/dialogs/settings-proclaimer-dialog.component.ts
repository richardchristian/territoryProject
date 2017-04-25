import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
    selector: 'settings-proclaimer-dialog',
    templateUrl: 'settings-proclaimer-dialog.component.html'
})
export class SettingsProclaimerDialogComponent {
    @ViewChild('infoModal') public infoModal: ModalDirective;

    constructor() { }

    show() {
        this.infoModal.show();
    }
    hide() {
        this.infoModal.hide();
    }

}
