import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-territories',
    template: '<router-outlet> </router-outlet>'
})
export class TerritoriesComponent {

    constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }
}
