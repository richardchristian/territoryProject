import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../_models/user';
import { AppConfig } from '../app.config';

@Injectable()
export class UserService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private config: AppConfig,
        private router: Router,
        private toastr: ToastsManager
    ) { }

    getAll(): Observable<User[]> {
        return this.http
            .get(this.config.apiUrl + '/users', { withCredentials: true })
            .map((res) => {
                return res.json().users;
            })
            .catch(err => this.handleError(err));
    }

    getById(id: string): Observable<User> {
        return this.http
            .get(this.config.apiUrl + '/users/' + id, { withCredentials: true })
            .map((res) => {
                return res.json().user;
            })
            .catch(err => this.handleError(err));
    }

    update(user: User): Observable<User> {
        return this.http
            .put(this.config.apiUrl + '/users/' + user._id, user, { withCredentials: true })
            .catch(err => this.handleError(err));

    }

    create(user: User): Observable<User> {
        return this.http
            .post(this.config.apiUrl + '/register', user, { withCredentials: true })
            .map(res => res.json().user)
            .catch(err => this.handleError(err));
    }

    delete(_id: string): Observable<Response> {
        return this.http
            .delete(this.config.apiUrl + '/users/' + _id, { withCredentials: true })
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