import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Territory } from '../_models/territory';
import { Proclaimer } from '../_models/proclaimer';
import { ProcessingData } from '../_models/processing-data';

import { TerritoryService } from '../_services/territory.service';
import { ProclaimerService } from '../_services/proclaimer.service';
import { ProcessingDataService } from '../_services/processing-data.service';

import { SelectComponent } from 'ng2-select';
import { SelectItem } from 'ng2-select';

import * as moment from 'moment';
import 'moment-timezone';
import { AppConfig } from '../app.config';

@Component({
    selector: 'territories-dialog',
    templateUrl: './territories-dialog.component.html'
})
export class TerritoriesDialogComponent implements OnInit {
    @ViewChild('infoModal') public infoModal: ModalDirective;
    @ViewChild('territoriesInput') territoriesInput: SelectComponent;
    @ViewChild('proclaimersInput') proclaimersInput: SelectComponent;

    @Output() processingDataSave = new EventEmitter<ProcessingData>();

    private _territorySearchString: string = null;
    private _proclaimerSearchString: string = null;
    public readonly: boolean = true;
    public isNewEntry: boolean = false;
    public processingDataParam: ProcessingData = new ProcessingData();
    public origParamData: ProcessingData;

    form = <any>[];

    constructor(
        private toastr: ToastsManager,
        private territoryService: TerritoryService,
        private proclaimerService: ProclaimerService,
        private processingDataService: ProcessingDataService,
        private config: AppConfig
    ) { }

    ngOnInit() {
        this.territoriesInput.items = [];
        this.proclaimersInput.items = [];
    }

    show(_processingData: ProcessingData) {
        var dialog = this.infoModal.show();

        this.searchTerritories("", true);
        this.searchProclaimers("", true);
        this.processingDataParam = this.initParam(_processingData);
        if (this.processingDataParam._id !== null) {
            this.readonly = true;
            this.processingDataParam.from = new Date(_processingData.from);
            this.processingDataParam.to = new Date(_processingData.to);
            this.processingDataParam.extend = (_processingData.extend !== undefined && _processingData.extend !== null) ? new Date(_processingData.extend) : undefined;

            this.setSelectedTerritoryInput(this.processingDataParam.territoryID);
            this.setSelectedProclaimerInput(this.processingDataParam.proclaimerID);
        } else {
            this.readonly = false;
            this.reset();
        }
        console.log(this.processingDataParam);
    }

    hide() {
        this.infoModal.hide();
    }

    initParam(_processingData: ProcessingData) {
        var data;
        if (_processingData === null || _processingData === undefined) {
            data = {
                _id: null,
                proclaimerID: null,
                territoryID: null,
                from: null,
                to: null,
                extend: null,
                submitDate: null,
                submitted: null
            };
            this.isNewEntry = true;
        } else {
            data = _processingData;
            this.isNewEntry = false;

            this.origParamData = {
                _id: _processingData._id,
                proclaimerID: _processingData.proclaimerID,
                territoryID: _processingData.territoryID,
                from: new Date(_processingData.from),
                to: new Date(_processingData.to),
                extend: (_processingData.extend !== undefined && _processingData.extend !== null) ? new Date(_processingData.extend) : undefined,
                submitDate: (_processingData.submitDate !== undefined && _processingData.submitDate !== null) ? new Date(_processingData.submitDate) : undefined,
                submitted: _processingData.submitted
            };
        }

        return data;
    }

    searchTerritories(searchString: string, init: boolean) {
        /*if (searchString === this._territorySearchString) {
            // string was deleted so assign empty array to ng-select items
            this.territoriesInput.items = [];
            // force the ng-select to update and show the new list
            (<any>this.territoriesInput).open();

            this._territorySearchString = '';
            return;
        }*/
        this._territorySearchString = searchString;
        this.territoryService.searchNotProcessing(searchString) // async fetch from server
            .subscribe(
            data => {

                if (this.processingDataParam._id !== null)
                    data.push(this.processingDataParam.territoryID);

                this.territoriesInput.items = data.map(result => {
                    return { id: result._id, text: [result.territoryNumber, result.name].join(' - ') };
                });
                if (!init)
                    (<any>this.territoriesInput).open();
            },
            error => {
                alert(error);
            });
    }

    searchProclaimers(searchString: string, init: boolean) {
        /*if (searchString === this._proclaimerSearchString) {
            // string was deleted so assign empty array to ng-select items
            this.proclaimersInput.items = [];
            // force the ng-select to update and show the new list
            (<any>this.proclaimersInput).open();

            this._proclaimerSearchString = '';
            return;
        }*/
        this._proclaimerSearchString = searchString
        this.proclaimerService.search(searchString) // async fetch from server
            .subscribe(
            data => {

                this.proclaimersInput.items = data.map(result => {
                    return { id: result._id, text: [result.lastName.toUpperCase(), result.firstName].join(' ') };
                });
                if (!init)
                    (<any>this.proclaimersInput).open();
            },
            error => {
                alert(error);
            }
            )
    }

    selectTerritory(value: any) {
        this.form.territoryID = value;
    }

    selectProclaimer(value: any) {
        this.form.proclaimerID = value;
    }

    setSelectedTerritoryInput(item: Territory) {
        this.territoriesInput.active = [{
            id: item._id,
            text: [
                item.territoryNumber,
                item.name
            ].join(' - ')
        }];
    }

    setSelectedProclaimerInput(item: Proclaimer) {
        this.proclaimersInput.active = [{
            id: item._id,
            text: [
                item.firstName,
                item.lastName
            ].join(' ')
        }]
    }

    getProcessingDataName() {
        if (this.processingDataParam._id === null || this.processingDataParam._id === undefined)
            return "Neuer Eintrag";

        return this.processingDataParam.territoryID.territoryNumber + '-' +
            this.processingDataParam.territoryID.name + ' (' +
            this.processingDataParam.proclaimerID.firstName + ' ' +
            this.processingDataParam.proclaimerID.lastName + ')';
    }
    inputFromChanged(value: any) {
        if (this.processingDataParam.to === undefined || this.processingDataParam.to === null)
            this.processingDataParam.to = moment.utc(value).add(this.config.territory.standardTime, 'month').toDate();
    }

    save() {
        this.getProcessingDataObj().then(result => {
            if (result.valid) {
                this.processingDataSave.emit(result.validDataObj);
                this.hide();
            } else {
                this.toastr.error(result.message, 'Fehler!');
            }
        });
    }

    edit() {
        this.readonly = false;
    }

    cancel() {
        if (this.processingDataParam._id === null)
            this.hide();
        else {
            this.readonly = true;
            this.setSelectedTerritoryInput(this.processingDataParam.territoryID);
            this.setSelectedProclaimerInput(this.processingDataParam.proclaimerID);
            this.processingDataParam.from = this.origParamData.from;
            this.processingDataParam.to = this.origParamData.to;
            this.processingDataParam.extend = this.origParamData.extend;
            this.processingDataParam.submitted = this.origParamData.submitted;
            this.processingDataParam.submitDate = this.origParamData.submitDate;
        }
    }

    extend() {
        this.edit();
        var momentToDate = moment.utc(this.processingDataParam.to);
        this.processingDataParam.extend = momentToDate.add(this.config.territory.extendTime, 'month').toDate();
    }

    getback() {
        this.edit();
        this.processingDataParam.submitted = true;
        this.processingDataParam.submitDate = new Date();
        /*this.save();*/
    }

    reset() {
        this.territoriesInput.active = [];
        this.proclaimersInput.active = [];
    }

    getProcessingDataObj(): Promise<any> {
        var valid: Boolean = true;
        var message: String = '<ul>';
        var validDataObj = <ProcessingData>{};

        validDataObj._id = this.processingDataParam._id;

        if (this.territoriesInput.active.length === 0) {
            message += '<li>Kein Gebiet ausgewählt.</li>';
        } else {
            validDataObj.territoryID = this.territoriesInput.active[0].id;
        }
        if (this.proclaimersInput.active.length === 0) {
            message += '<li>Kein Verkündiger ausgewählt.</li>';
        } else {
            validDataObj.proclaimerID = this.proclaimersInput.active[0].id;
        }
        if (this.processingDataParam.from === null) {
            message += '<li>Kein "Ausgeborgt am" - Datum ausgewählt.</li>';
        } else {
            validDataObj.from = this.processingDataParam.from;
            validDataObj.from.setHours(2, 0, 0, 0); // set to 2 for time-issue
            console.log(validDataObj.from);
        }
        if (this.processingDataParam.to === null) {
            message += '<li>Kein Rückgabe - Datum ausgewählt.</li>';
        } else {
            validDataObj.to = this.processingDataParam.to;
            validDataObj.to.setHours(2, 0, 0, 0);
        }
        message += '</ul>';
        if (this.processingDataParam.extend != undefined) {
            validDataObj.extend = this.processingDataParam.extend;
            validDataObj.extend.setHours(2, 0, 0, 0);
        }
        if (this.processingDataParam.submitDate != undefined) {
            validDataObj.submitDate = this.processingDataParam.submitDate;
            validDataObj.submitDate.setHours(2, 0, 0, 0);
        }
        validDataObj.submitted = this.processingDataParam.submitted || false;

        return Promise.resolve({
            valid: message === '<ul></ul>',
            message,
            validDataObj
        });
    }
}
