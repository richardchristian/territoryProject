import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'reports',
    template: `<router-outlet></router-outlet>`
})
export class ReportsComponent {
    constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }
}



