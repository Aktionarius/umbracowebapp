import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent }         from './app.component';
import { routing, appRoutingProviders }  from './app.routing';
import { HttpService }  from './http.service';

import { PageComponent }    from './page/page.component';
import { AboutComponent }  from './about/about.component';
import { ErrorComponent } from './error/error.component';
import {SeoService} from "./services/SeoService";
import {DataParseService} from "./services/DataParseService";
import {MenuItemComponent} from "./shared/menu/menu.item.component";
import {MenuComponent} from "./shared/menu/menu.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    PageComponent,
    AboutComponent,
    ErrorComponent,
    MenuComponent,
    MenuItemComponent
  ],
  providers: [
    appRoutingProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    HttpService,
    SeoService,
    DataParseService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
