import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Config
import { AppConfig } from './app.config';

// Services
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { ProclaimerService } from './_services/proclaimer.service';
import { TerritoryService } from './_services/territory.service';

// Guards
import { AuthGuard } from './_guards/auth.guard';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

// Toastr
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOptions } from './custom-toast.options';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    ToastModule.forRoot()
  ],
  declarations: [
    AppComponent,

    FullLayoutComponent,
    SimpleLayoutComponent,

    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
  ],
  providers: [
    AppConfig,
    AuthenticationService,
    AuthGuard,
    UserService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: ToastOptions, useClass: CustomToastOptions },

  ],
  exports: [
    SimpleLayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
