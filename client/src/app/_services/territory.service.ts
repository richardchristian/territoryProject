import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Territory } from '../_models/territory';
import { AppConfig } from '../app.config';

@Injectable()
export class TerritoryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    getAll(): Observable<Territory[]> {
        return this.http
            .get(this.config.apiUrl + '/territories', { withCredentials: true })
            .map((res) => {
                console.log(res);
                return res.json()
            }
            )
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    getById(id: string): Observable<Territory> {
        return this.http
            .get(this.config.apiUrl + '/territories/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(territory: Territory): Observable<Response> {
        return this.http
            .put(this.config.apiUrl + '/territories/' + territory.id, territory, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    create(territory: Territory): Observable<Territory> {
        return this.http
            .post(this.config.apiUrl + '/territories/create', territory, { withCredentials: true })
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: number): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/territories/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}