import { ToastOptions } from 'ng2-toastr';

export class CustomToastOptions extends ToastOptions {
    enableHTML = true;
    showCloseButton = true;
}