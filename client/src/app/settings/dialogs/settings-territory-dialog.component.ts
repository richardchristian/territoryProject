
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { Territory } from '../../_models/territory';

@Component({
    selector: 'settings-territory-dialog',
    templateUrl: 'settings-territory-dialog.component.html'
})
export class SettingsTerritoryDialogComponent {
    @ViewChild('infoModal') public infoModal: ModalDirective;
    @Output() territorySave = new EventEmitter<Territory>();

    public territoryOrig: Territory;
    public territory: Territory = { _id: "", territoryNumber: "", name: "", comment: "" };
    public readonly: boolean = true;

    constructor() { }

    show(param) {
        this.readonly = param !== undefined;
        this.territory = param || { _id: "", territoryNumber: "", name: "", comment: "" };
        this.territoryOrig = param ?
            { _id: param._id, territoryNumber: param.territoryNumber, name: param.name, comment: param.comment } :
            { _id: "", territoryNumber: "", name: "", comment: "" };
        console.log(this.territoryOrig);
        var dialog = this.infoModal.show();
    }

    hide() {
        this.infoModal.hide();
    }

    getName() {
        if (this.territory !== undefined) {
            if (this.territory._id !== "")
                return this.territory.name
        }
        return "Neues Gebiet";
    }

    edit() {
        this.readonly = false;
    }

    cancel() {
        if (this.territory._id == "")
            this.hide();

        this.readonly = true;
        this.territory.territoryNumber = this.territoryOrig.territoryNumber;
        this.territory.name = this.territoryOrig.name;
        this.territory.comment = this.territoryOrig.comment;
    }

    save() {
        this.territorySave.emit(this.territory);
        this.hide();
    }
}
