import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild,
  Resolve
} from "@angular/router";
import {Observable} from "rxjs";
import {HttpService} from "../http.service";
import {DataParseService} from "./DataParseService";
import {Injectable} from "@angular/core";

@Injectable()
export class CanActivateRoute implements CanActivate, CanActivateChild {

  isLoaded: boolean = false;

  constructor(private http: HttpService, private dataParse: DataParseService, private router: Router) {
    console.log("constructor")
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let that = this;
    return new Promise<boolean>((resolve)=> {
      if (that.isLoaded) {
        resolve(true);
        return;
      }
      that.http.getMenu().then((response)=> {
        this.router.config[0].children=this.dataParse.parseMenuDataToRoutes(response);
        this.router.resetConfig([...this.router.config])
        that.isLoaded = true;
        resolve(false);

        that.router.navigateByUrl(state.url);

      })
    })
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }

}

