import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../app.config';

@Injectable()
export class ReportService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private config: AppConfig,
        private router: Router,
        private toastr: ToastsManager
    ) { }

    getAllTerritoryCards(): Observable<any> {
        return this.http
            .get(this.config.apiUrl + '/reports/territorycards', { withCredentials: true })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    getTerritoryCardById(id: string): Observable<any> {
        return this.http
            .get(this.config.apiUrl + '/reports/territorycards/' + id, { withCredentials: true })
            .catch(err => this.handleError(err));
    }

    getTerritoryStatistics(timeSection?: string): Observable<any> {
        timeSection = timeSection || '';
        return this.http
            .get(this.config.apiUrl + '/reports/statistics/' + timeSection, { withCredentials: true })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    getPDFfromHTML(html: string) {
        // @TODO
        /*var doc = new jsPDF();*/
        /*return doc;*/
    }

    private handleError(error: any): Observable<any> {
        if (error.status === 401) {
            this.toastr.error('<b>Redirect to Login-Page</b>', 'Unautherized').then(() => {
                setTimeout(() => { this.router.navigate(['/pages/login'], { queryParams: { returnUrl: this.router.url } }) }, 3000);
            });
        } else {
            //@Todo Logging
            console.log('an error occures', error);
        }
        return Observable.throw(error.status + ': ' + error.statusText || 'Server error');
    }
}