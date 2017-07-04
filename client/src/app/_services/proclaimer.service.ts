import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Proclaimer } from '../_models/proclaimer';
import { AppConfig } from '../app.config';

@Injectable()
export class ProclaimerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private config: AppConfig,
        private router: Router,
        private toastr: ToastsManager
    ) { }

    getAll(): Observable<Proclaimer[]> {
        return this.http
            .get(this.config.apiUrl + '/proclaimers', { withCredentials: true })
            .map(res => res.json().proclaimers)
            .catch(err => this.handleError(err));
    }

    getById(id: string): Observable<Proclaimer> {
        return this.http
            .get(this.config.apiUrl + '/proclaimers/' + id, { withCredentials: true })
            .catch(err => this.handleError(err));
    }

    update(proclaimer: Proclaimer): Observable<Proclaimer> {
        return this.http
            .put(this.config.apiUrl + '/proclaimers/' + proclaimer._id, proclaimer, { withCredentials: true })
            .map(res => res.json().proclaimer)
            .catch(err => this.handleError(err));
    }

    create(proclaimer: Proclaimer): Observable<Proclaimer> {
        return this.http
            .post(this.config.apiUrl + '/proclaimers/create', proclaimer, { withCredentials: true })
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    delete(id: number): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/proclaimers/' + id, { withCredentials: true })
            .catch(err => this.handleError(err));
    }


    search(term: string, active?: boolean): Observable<Proclaimer[]> {
        return this.http
            .get(this.config.apiUrl + '/proclaimers/search?term=' + term + (active !== undefined ? '&active=' + active : ''), { withCredentials: true })
            .map(res => res.json().proclaimers)
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