import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppComponent} from "./components/app/app.component";
import {routing, appRoutingProviders} from "./app.routing";
import {HttpService} from "./services/http.service";
import {PageComponent} from "./components/page/page.component";
import {AboutComponent} from "./components/about/about.component";
import {ErrorComponent} from "./components/error/error.component";
import {SeoService} from "./services/SeoService";
import {DataParseService} from "./services/DataParseService";
import {MenuItemComponent} from "./shared/menu/menu.item.component";
import {MenuComponent} from "./shared/menu/menu.component";
import {RouteController} from "./services/RouteController";
import {ContentComponent} from "./components/content/content.component";
import {DataSrc} from "./diractives/DataSrc/DataSrc";

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
    MenuItemComponent,
    ContentComponent,
    DataSrc
  ],
  providers: [
    appRoutingProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    HttpService,
    SeoService,
    DataParseService,
    RouteController
  ],
  entryComponents: [PageComponent, ErrorComponent, AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
