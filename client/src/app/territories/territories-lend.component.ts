import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Territory } from '../_models/territory';
import { Proclaimer } from '../_models/proclaimer';

import { TerritoryService } from '../_services/territory.service';
import { ProclaimerService } from '../_services/proclaimer.service';
import { ProcessingDataService } from '../_services/processing-data.service';

import { SelectComponent } from 'ng2-select';

import * as moment from 'moment';

@Component({
    selector: 'territories-lend',
    templateUrl: './territories-lend.component.html'
})
export class TerritoriesLendComponent implements OnInit {
    @ViewChild('territoriesInput') territoriesInput: SelectComponent;
    @ViewChild('proclaimersInput') proclaimersInput: SelectComponent;

    private _territorySearchString: string = null
    private _proclaimerSearchString: string = null

    form = <any>[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastsManager,
        private territoryService: TerritoryService,
        private proclaimerService: ProclaimerService,
        private processingDataService: ProcessingDataService
    ) { }

    ngOnInit() {
        this.territoriesInput.items = [];
        this.proclaimersInput.items = [];
    }

    searchTerritories(searchString: string) {
        if (searchString === this._territorySearchString) {
            // string was deleted so assign empty array to ng-select items
            this.territoriesInput.items = [];
            // force the ng-select to update and show the new list
            (<any>this.territoriesInput).open();

            this._territorySearchString = '';
            return;
        }
        this._territorySearchString = searchString
        this.territoryService.searchNotProcessing(searchString) // async fetch from server
            .subscribe(
            data => {
                this.territoriesInput.items = data.map(result => {
                    return { id: result._id, text: [result.territoryNumber, result.name].join(' - ') };
                });
                (<any>this.territoriesInput).open();
            },
            error => {
                alert(error);
            }
            )
    }

    searchProclaimers(searchString: string) {
        if (searchString === this._territorySearchString) {
            // string was deleted so assign empty array to ng-select items
            this.proclaimersInput.items = [];
            // force the ng-select to update and show the new list
            (<any>this.proclaimersInput).open();

            this._proclaimerSearchString = '';
            return;
        }
        this._proclaimerSearchString = searchString
        this.proclaimerService.search(searchString) // async fetch from server
            .subscribe(
            data => {
                this.proclaimersInput.items = data.map(result => {
                    return { id: result._id, text: [result.firstName, result.lastName].join(' ') };
                });
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

    inputFromChanged(value: any) {
        if (this.form.to === undefined || this.form.to === '' || this.form.to === null)
            this.form.to = moment(value).add(6, 'month').format('YYYY-MM-DD');
    }

    save() {
        this.validateForm(this.form).then(result => {
            if (!result.valid) {
                this.toastr.error(result.message, 'Fehler!');
                return;
            }

            this.processingDataService.create(result.validForm)
                .subscribe(
                data => {
                    this.toastr.success('Eintrag hinzugefügt.', 'Erfolgreich gespeichert!');
                    this.reset();
                }, error => {
                    this.toastr.error(error.message);
                });
        });
    }

    reset() {
        this.form = <any>{};
        var territoryActive = this.territoriesInput.activeOption;
        this.territoriesInput.remove(territoryActive);
        var proclaimersActive = this.proclaimersInput.activeOption;
        this.proclaimersInput.remove(proclaimersActive);
    }

    validateForm(form): Promise<any> {
        var valid: Boolean = true;
        var message: String = '<ul>';
        var validForm = <any>{};

        if (form.territoryID === undefined || form.territoryID === '' || form.territoryID === null) {
            message += '<li>Kein Gebiet ausgewählt.</li>';
        } else {
            validForm.territoryID = form.territoryID.id;
        }
        if (form.proclaimerID === undefined || form.proclaimerID === '' || form.proclaimerID === null) {
            message += '<li>Kein Verkündiger ausgewählt.</li>';
        } else {
            validForm.proclaimerID = form.proclaimerID.id;
        }
        if (form.from === undefined || form.from === '' || form.from === null) {
            message += '<li>Kein "Ausgeborgt am" - Datum ausgewählt.</li>';
        } else {
            validForm.from = form.from;
        }
        if (form.to === undefined || form.to === '' || form.to === null) {
            message += '<li>Kein Rückgabe - Datum ausgewählt.</li>';
        } else {
            validForm.to = form.to;
        }
        message += '</ul>';
        validForm.submitted = form.submitted || false;

        return Promise.resolve({
            valid: message === '<ul></ul>',
            message,
            validForm
        });


    }
}
