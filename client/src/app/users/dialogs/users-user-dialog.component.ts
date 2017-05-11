import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { User } from '../../_models/user';

@Component({
    selector: 'users-user-dialog',
    templateUrl: 'users-user-dialog.component.html'
})
export class UsersUserDialogComponent {
    @ViewChild('infoModal') public infoModal: ModalDirective;
    @Output() userSave = new EventEmitter<User>();

    public user: User = { _id: "", email: "", firstName: "", lastName: "" };
    public readonly: boolean = true;

    constructor() { }


    show(param) {
        this.readonly = true;

        if (param)
            this.user = param;
        else {
            this.user = { _id: "", email: "", firstName: "", lastName: "" };
            this.readonly = false;
        }
        var dialog = this.infoModal.show();
    }

    hide() {
        this.infoModal.hide();
    }

    edit() {
        this.readonly = false;
    }

    cancel() {
        if (this.user._id == "")
            this.hide();

        this.readonly = true;
    }

    save() {
        this.userSave.emit(this.user);
        this.hide();
    }

    getEmail() {
        if (this.user._id == "")
            return "Neuer Benutzer";
        return this.user.email;
    }
}
