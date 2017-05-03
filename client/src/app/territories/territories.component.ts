import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as moment from 'moment';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { TerritoriesDialogComponent } from './territories-dialog.component';

import { ProcessingDataService } from '../_services/processing-data.service';
import { ProcessingData } from '../_models/processing-data';

@Component({
    selector: 'territories',
    templateUrl: './territories.component.html'
})
export class TerritoriesComponent implements OnInit {

    processingData: Observable<ProcessingData[]>;
    private searchTerms = new BehaviorSubject<string>('');
    @ViewChild('infoModal') infoModal: TerritoriesDialogComponent;

    constructor(
        public toastr: ToastsManager,
        vRef: ViewContainerRef,
        private processingDataService: ProcessingDataService) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.getSortedSearchResult('territoryID.territoryNumber');
    }

    getSortedSearchResult(sort: string): void {
        this.processingData = this.searchTerms
            .debounceTime(300)
            .switchMap(term => this.processingDataService.search(term, sort))
            .catch(error => {
                console.log(error);
                return Observable.of<ProcessingData[]>([]);
            });
    }

    public getPercentage(from, to, extend) {
        var _from = moment(from);
        var _to = extend === undefined ? moment(to) : moment(extend);
        var _now = moment();

        return Math.round((_now.diff(_from) / _to.diff(_from)) * 100);
    }

    public setPercentageStyle(from, to, extend) {
        var styles = {
            'width': '',
            'background-color': "#4dbd74"
        };
        var perc = this.getPercentage(from, to, extend);
        styles.width = perc + '%';

        if (perc > 70)
            styles['background-color'] = "#f8cb00";
        if (perc > 95)
            styles['background-color'] = "#f86c6b";

        return styles;
    }

    save(_processingData: ProcessingData) {
        console.log(_processingData);
        if (_processingData._id === "" || _processingData._id === null) {
            this.processingDataService.create(_processingData)
                .subscribe(
                data => {
                    this.toastr.success("Eintrag hinzugefügt", "Speichern erfolgreich!");
                },
                err => {
                    console.log(err);
                    this.toastr.error(err, "Fehler");
                });
        } else {
            this.processingDataService.update(_processingData)
                .subscribe(
                data => {
                    this.toastr.success("Eintrag aktualisiert", "Speichern erfolgreich!");
                },
                err => {
                    console.log(err);
                    this.toastr.error(err, "Fehler");
                });
        }
        this.searchTerms.next("");
    }
}



