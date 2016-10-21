import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from "./error/error.component";
import {CanActivateRoute} from "./services/CanActivate";
import {ContentComponent} from "./content/content.component";

var appRoutes: Routes = [
  {
    path: '', component: ContentComponent, children: [{
    path: "**",
    component: ErrorComponent,
    canActivate: [CanActivateRoute]
  }], canActivate: [CanActivateRoute], canActivateChild: [CanActivateRoute]
  },
  {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
