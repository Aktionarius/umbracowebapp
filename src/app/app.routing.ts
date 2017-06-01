import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./components/error/error.component";
import {RouteController} from "./services/RouteController";
import {FormComponent} from "./components/form/form.component";
import {PageComponent} from "./components/page/page.component";
import {AppComponent} from "./components/app/app.component";
import {ContentComponent} from "./components/content/content.component";
import Settings from './services/settings';

var appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        // redirectTo: 'menu',
        redirectTo: Settings[window.location.hostname].starturl,
        pathMatch: 'full'
      },
      {
        path: ':side',
        pathMatch: 'prefix',
        component: PageComponent
      },
      {
        path: ':side/:subpage',
        component: PageComponent
      },
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
