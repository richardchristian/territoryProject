import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { Proclaimer } from '../../_models/proclaimer';

@Component({
    selector: 'settings-proclaimer-dialog',
    templateUrl: 'settings-proclaimer-dialog.component.html'
})
export class SettingsProclaimerDialogComponent {
    @ViewChild('infoModal') public infoModal: ModalDirective;
    @Output() proclaimerSave = new EventEmitter<Proclaimer>();

    public proclaimerOrig: Proclaimer;
    public proclaimer: Proclaimer = { _id: "", firstName: "", lastName: "" };
    public readonly: boolean = true;

    constructor() { }

    show(param) {
        this.readonly = param !== undefined;
        this.proclaimer = param || { _id: "", firstName: "", lastName: "" };
        this.proclaimerOrig = param ?
            { _id: param._id, firstName: param.firstName, lastName: param.lastName } :
            { _id: "", firstName: "", lastName: "" };
        console.log(this.proclaimerOrig);
        var dialog = this.infoModal.show();
    }

    hide() {
        this.infoModal.hide();
    }

    getFirstName() {
        if (this.proclaimer !== undefined) {
            if (this.proclaimer._id !== "")
                return this.proclaimer.firstName
        }
        return "Neuer";
    }

    getLastName() {
        if (this.proclaimer !== undefined) {
            if (this.proclaimer._id !== "")
                return this.proclaimer.lastName
        }
        return "Verkündiger";
    }

    edit() {
        this.readonly = false;
    }

    cancel() {
        if (this.proclaimer._id == "")
            this.hide();

        console.log(this.proclaimerOrig);
        this.readonly = true;
        this.proclaimer.firstName = this.proclaimerOrig.firstName;
        this.proclaimer.lastName = this.proclaimerOrig.lastName;
    }

    save() {
        this.proclaimerSave.emit(this.proclaimer);
        this.hide();
    }
}
