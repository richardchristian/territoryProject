import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Territory } from '../_models/territory';
import { AppConfig } from '../app.config';

@Injectable()
export class TerritoryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private config: AppConfig,
        private router: Router,
        private toastr: ToastsManager
    ) { }
    getAll(): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/territories', { withCredentials: true })
            .map((res) => res.json().territories)
            .catch(err => this.handleError(err));
    }

    getById(id: string): Observable<Territory> {
        return this.http
            .get(this.config.apiUrl + '/territories/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getNotProcessing(): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/processing/territories/not', { withCredentials: true })
            .map((res) => res.json().territories)
            .catch(err => this.handleError(err));
    }

    getProcessing(): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/processing/territories', { withCredentials: true })
            .map((res) => res.json().territories)
            .catch(err => this.handleError(err));
    }


    searchNotProcessing(term: string): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/processing/territories/not/search?term=' + term, { withCredentials: true })
            .map((res) => res.json().territories)
            .catch(err => this.handleError(err));
    }

    searchProcessing(term: string): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/processing/territories/search?term=' + term, { withCredentials: true })
            .map((res) => res.json().territories)
            .catch(err => this.handleError(err));
    }

    update(territory: Territory): Observable<Territory> {
        return this.http
            .put(this.config.apiUrl + '/territories/' + territory._id, territory, { withCredentials: true })
            .map(res => res.json().territory)
            .catch(err => this.handleError(err));
    }

    create(territory: Territory): Observable<Territory> {
        return this.http
            .post(this.config.apiUrl + '/territories/create', territory, { withCredentials: true })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    delete(id: number): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/territories/' + id, { withCredentials: true })
            .catch(err => this.handleError(err));
    }

    search(term: string): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/territories/search?term=' + term, { withCredentials: true })
            .map((res) => res.json().territories)
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