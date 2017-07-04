import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ProcessingData } from '../_models/processing-data';
import { AppConfig } from '../app.config';

@Injectable()
export class ProcessingDataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private config: AppConfig,
        private router: Router,
        private toastr: ToastsManager
    ) { }
    getAll(): Observable<ProcessingData[]> {
        return this.http
            .get(this.config.apiUrl + '/processing', { withCredentials: true })
            .map((res) => res.json().territories)
            .catch(err => this.handleError(err));
    }

    getById(id: string): Observable<ProcessingData> {
        return this.http
            .get(this.config.apiUrl + '/processing/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(processingData: ProcessingData): Observable<Response> {
        return this.http
            .put(this.config.apiUrl + '/processing/' + processingData._id, processingData, { withCredentials: true })
            .catch(err => this.handleError(err));
    }

    create(processingData: ProcessingData): Observable<ProcessingData> {
        return this.http
            .post(this.config.apiUrl + '/processing/add', processingData, { withCredentials: true })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    delete(id: number): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/processing/' + id, { withCredentials: true })
            .catch(err => this.handleError(err));
    }

    search(term: string, sort: string, direction: string): Observable<ProcessingData[]> {
        return this.http
            .get(this.config.apiUrl + '/processing/search?term=' + term + '&sort=' + sort + '&direction=' + direction, { withCredentials: true })
            .map((res) => res.json().processingData)
            .catch(err => this.handleError(err));
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