import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as moment from 'moment';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ProcessingDataService } from '../_services/processing-data.service';
import { ProcessingData } from '../_models/processing-data';

@Component({
    selector: 'territories-getback-extend-component',
    templateUrl: './territories-getback-extend.component.html'
})
export class TerritoriesGetbackExtendComponent implements OnInit {

    processingData: Observable<ProcessingData[]>;
    private searchTerms = new BehaviorSubject<string>('');

    constructor(private processingDataService: ProcessingDataService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.processingData = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => this.processingDataService.search(term))
            .catch(error => {
                console.log(error);
                return Observable.of<ProcessingData[]>([]);
            });
    }

    public getPercentage(from, to) {
        var _from = moment(from);
        var _to = moment(to);
        var _now = moment();

        return Math.round((_now.diff(_from) / _to.diff(_from)) * 100);
    }

    public setPercentageStyle(from, to) {
        var styles = {
            'width': '',
            'background-color': "#4dbd74"
        };
        var perc = this.getPercentage(from, to);
        styles.width = perc + '%';

        if (perc > 70)
            styles['background-color'] = "#f8cb00";
        if (perc > 95)
            styles['background-color'] = "#f86c6b";

        return styles;
    }
}



