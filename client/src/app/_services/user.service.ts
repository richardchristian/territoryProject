import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../_models/user';
import { AppConfig } from '../app.config';

@Injectable()
export class UserService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    getAll(): Observable<User[]> {
        return this.http
            .get(this.config.apiUrl + '/users', { withCredentials: true })
            .map((res) => {
                return res.json()
            }
            )
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    getById(id: string): Observable<User> {
        return this.http
            .get(this.config.apiUrl + '/users/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(user: User): Observable<Response> {
        return this.http
            .put(this.config.apiUrl + '/users/' + user.id, user, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    create(user: User): Observable<User> {
        return this.http
            .post(this.config.apiUrl + '/users/register', user, { withCredentials: true })
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: number): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/users/' + id, { withCredentials: true })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}