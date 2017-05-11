import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOptions } from '../custom-toast.options';

import { UsersComponent } from './users.component';
import { UsersUserDialogComponent } from './dialogs/users-user-dialog.component';

// Modal
import { ModalModule } from 'ngx-bootstrap/modal';

import { UserService } from '../_services/user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ToastModule.forRoot(),
        RouterModule.forChild([{
            path: '',
            component: UsersComponent
        }])

    ],
    declarations: [
        UsersComponent,
        UsersUserDialogComponent
    ],
    exports: [],
    providers: [
        UserService,
        { provide: ToastOptions, useClass: CustomToastOptions },
    ],
    bootstrap: []
})
export class UsersModule { }
