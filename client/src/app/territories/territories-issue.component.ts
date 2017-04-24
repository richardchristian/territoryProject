import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Territory } from '../_models/territory';
import { Proclaimer } from '../_models/proclaimer';

import { TerritoryService } from '../_services/territory.service';
import { ProclaimerService } from '../_services/proclaimer.service';

import { SelectComponent } from 'ng2-select';


@Component({
    selector: 'territories-issue',
    templateUrl: './territories-issue.component.html'
})
export class TerritoriesIssueComponent implements OnInit {
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
        private proclaimerService: ProclaimerService
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

    save() {
        var errorMessage = '';
        if (this.form.territoryID === undefined)
            errorMessage = 'Kein Gebiet ausgewählt.';
        if (this.form.proclaimerID === undefined)
            errorMessage = 'Kein Verkündiger ausgewählt.';
        if (this.form.from === undefined || this.form.from === '')
            errorMessage = 'Kein "Ausgeborgt am" - Datum ausgewählt.';

        if (this.form.to === undefined || this.form.to === '')
            errorMessage = 'Kein Rückgabe - Datum ausgewählt.';
        if (errorMessage != '')
            this.toastr.error(errorMessage);

        console.log(this.form);

        this.toastr.success('Erfolgreich gespeicher');

    }
}
