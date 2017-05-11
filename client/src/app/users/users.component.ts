import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UsersUserDialogComponent } from './dialogs/users-user-dialog.component';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    public users: User[];
    @ViewChild('infoModal') infoModal: UsersUserDialogComponent;

    constructor(
        private userService: UserService,
        public toastr: ToastsManager,
        vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit(): void {
        this.userService.getAll()
            .subscribe(
            data => {
                console.log(data);
                this.users = data;
            },
            err => {
                console.log(err);
                this.toastr.error(err, "Fehler");
            });
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
                    this.toastr.success("User erfolgreich bearbeitet", data.email)
                },
                err => {
                    console.log(err);
                    this.toastr.error(err, "Fehler");
                });
        }
    }
}