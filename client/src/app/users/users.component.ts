import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UsersUserDialogComponent } from './dialogs/users-user-dialog.component';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

import { AuthenticationService } from '../_services/authentication.service';


@Component({
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    public currentUser: User;
    public users: User[];
    @ViewChild('infoModal') infoModal: UsersUserDialogComponent;

    constructor(
        private auth: AuthenticationService,
        private userService: UserService,
        public toastr: ToastsManager,
        vRef: ViewContainerRef) {

        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit(): void {
        this.userService.getAll()
            .subscribe(
            data => {
                this.users = data;
            },
            err => {
                console.log(err);
                this.toastr.error(err, "Fehler");
            });

        this.infoModal.setCurrentUser(JSON.parse(localStorage.getItem('currentUser')).user);
    }

    save(_user: User) {
        if (_user._id === "") {
            this.userService.create(_user)
                .subscribe(
                data => {
                    this.users.push(data);
                    this.toastr.success("User erfolgreich hinzugefügt", data.email);
                },
                err => {
                    console.log(err);
                    this.toastr.error(err, "Fehler");
                });
        } else {
            this.userService.update(_user)
                .subscribe(
                data => {
                    this.toastr.success("User erfolgreich bearbeitet", data.email);
                },
                err => {
                    console.log(err);
                    this.toastr.error(err, "Fehler");
                });
        }
    }

    delete(_user: User) {
        if (_user._id !== "") {
            this.userService.delete(_user._id)
                .subscribe(
                data => {
                    this.toastr.success("User erfolgreich entfernt");
                    this.users = this.users.filter(el => el._id !== _user._id);
                },
                err => {
                    console.log(err);
                    this.toastr.error(err, "Fehler");
                })
        }
    }
}