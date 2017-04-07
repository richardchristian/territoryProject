import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UIRouterModule } from 'ui-router-ng2';



import { MainComponent } from './main.component';
import { SocketService } from '../../components/socket/socket.service';


export const STATES = [
  { name: 'main', url: '/', component: MainComponent },
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        UIRouterModule.forChild({
            states: STATES,
        }),

    ],
    declarations: [
        MainComponent,
    ],
    providers: [
        SocketService,
    ],
    exports: [
        MainComponent,
    ],
})
export class MainModule {}
