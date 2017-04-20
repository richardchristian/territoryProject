import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Proclaimer } from '../_models/proclaimer';
import { AppConfig } from '../app.config';

@Injectable()
export class ProclaimerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    getAll(): Observable<Proclaimer[]> {
        return this.http
            .get(this.config.apiUrl + '/proclaimers', { withCredentials: true })
            .map((res) => {
                console.log(res);
                return res.json()
            }
            )
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    getById(id: string): Observable<Proclaimer> {
        return this.http
            .get(this.config.apiUrl + '/proclaimers/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(proclaimer: Proclaimer): Observable<Response> {
        return this.http
            .put(this.config.apiUrl + '/proclaimers/' + proclaimer.id, proclaimer, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    create(proclaimer: Proclaimer): Observable<Proclaimer> {
        return this.http
            .post(this.config.apiUrl + '/proclaimers/create', proclaimer, { withCredentials: true })
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: number): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/proclaimers/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}