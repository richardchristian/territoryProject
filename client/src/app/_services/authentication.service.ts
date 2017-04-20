import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {
    isLoggedIn: EventEmitter<User>;

    constructor(private http: Http, private config: AppConfig) {
        this.isLoggedIn = new EventEmitter<any>();
    }

    login(email: string, password: string) {
        return this.http.post(this.config.apiUrl + '/login', { email: email, password: password }, { withCredentials: true })
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    this.isLoggedIn.emit(<User>user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        return this.http.post(this.config.apiUrl + '/logout', { withCredentials: true })
            .map((response: Response) => {
                let result = response.json();
                if (result.success) {
                    this.isLoggedIn.emit(undefined);
                    localStorage.removeItem('currentUser');
                }
            });
    }
}