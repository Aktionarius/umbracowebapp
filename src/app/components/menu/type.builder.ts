import { Component, ComponentFactory, NgModule, Input, Injectable, Injector, Compiler, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import request from 'sync-request';
import { HttpService } from "../../services/http.service";
import { DataParseService } from "../../services/DataParseService";
import { IMenuItem } from "../../model/IMenuItem";
import { MenuItemComponent } from './menu-item/menu.item.component';
import { MenuSearchComponent } from './menu-search/menu.search.component';
import { FooterModule } from './../footer/footer.module';
import _ from 'lodash';

export interface IHaveDynamicData {};

@Injectable()
export class DynamicTypeBuilder {

  // wee need Dynamic component builder
  constructor(injector: Injector, private compiler: Compiler) {
    injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    compiler = injector.get(Compiler);
  }

  // this object is singleton - so we can use this as a cache
  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};

  public createComponentFactory(menu: any)
    : Promise<ComponentFactory<IHaveDynamicData>> {

    let factory = this._cacheOfFactories[menu.template];

    if (factory) {
        console.log("Module and Type are returned from cache")

        return new Promise((resolve) => {
            resolve(factory);
        });
    }

    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(menu);
    let module = this.createComponentModule(type);
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                this._cacheOfFactories[menu.template] = factory;

                resolve(factory);
            });
    });
  }

  protected createNewComponent (menu: any) {
    const html = request('GET', `/src/app/components/menu/${menu.template}.component.html`).getBody();
    const css = request('GET', `/src/app/components/menu/${menu.template}.component.css`).getBody();
    @Component({
        selector: 'dynamice-component',
        template: html,
        styles: [css],
    })
    class CustomDynamicComponent implements IHaveDynamicData {
      menuItems:IMenuItem[]=[]

      is_menutab_opened:boolean = menu.is_menutab_opened;

      is_searchtab_opened:boolean = false;

      nav_mode:string = '';
      umbpagegeneral;
      pagename;
      selected_item_info:any = {
        item: [],
        index_num: -1,
        isAnimating: false,
      };
      nativeWindow: any = window;

      constructor(
        private http: HttpService,
        private router: Router,
        private dataParse: DataParseService,
        private resolver: ComponentFactoryResolver,
        private location: PlatformLocation,
      ){
      }

      getMenuItems() {
        this.http.getMenu().subscribe(response=> {
          this.menuItems = this.dataParse.parseMenuDataToNav(response);
          for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].level = 0;
          }
        });
      }

      ngOnInit():void {
        setTimeout(() => {
          if (this.nativeWindow.setPageBackground) {
            const index = this.menuItems.findIndex((menuItem) => {
              const path = menuItem.path === '/' ? '/home/' : menuItem.path;
              return (`${this.nativeWindow.location.href}/`).indexOf(path) !== -1;
            });
            if (index !== -1) {
              this.selectItem(this.menuItems[index], index, false);
            }
          }
        }, 500);
        this.location.onPopState((event) => {
          if (this.nativeWindow) {
            const { closeAbout } = this.nativeWindow;
            closeAbout && closeAbout();
          }
          if ((`${this.nativeWindow.location.href}/`).indexOf('/menu/') !== -1) {
            this.selectItem({}, -1, false);
            return false;
          } else {
            const index = this.menuItems.findIndex((menuItem) => {
              const path = menuItem.path === '/' ? '/home/' : menuItem.path;
              return (`${this.nativeWindow.location.href}/`).indexOf(path) !== -1;
            });
            this.selectItem(this.menuItems[index], index, true);
          }
        });
        this.http.getUmbPageGeneralData()
          .subscribe(
            (umbpagegeneraldata: any) => {
              //The problem was that you received an array from server but used as object
              this.umbpagegeneral = umbpagegeneraldata.data[0];
            },
            (error: any) => {
              this.router.navigate(['error/not-found']);
            });

          this.getMenuItems();

          this.pagename = "Headline";

      }

      selectItem = (item, index_num, navigate = true) => {
        if (this.selected_item_info.index_num != index_num) {
          this.selected_item_info.isAnimating = true;
          setTimeout(() => this.selected_item_info.isAnimating = false, 1000);
        }
        this.selected_item_info.item = item;
        this.selected_item_info.index_num = index_num;

        if (this.nativeWindow.setPageBackground) {
          this.nativeWindow.setPageBackground(index_num);
        }
        if (index_num > -1)
          this.router.navigate([item.path === '/' ? 'home' : item.path]);
        else
          this.router.navigate(['menu']);
      }

      open = () => {
        if (this.nativeWindow.openAbout) {
          this.nativeWindow.openAbout();
          this.nativeWindow.isAboutOpen = true;
        }
      }

      close = () => {
        if (this.nativeWindow.isAboutOpen) {
          this.nativeWindow.closeAbout();
          this.nativeWindow.isAboutOpen = false;
        } else {
          this.selectItem({}, -1, true);
        }
      }

      private getWidthSearchTab():string {
        if(this.is_searchtab_opened)  return "100%";
        else return "0px";
      }

      private getClass():string {
        if (this.is_menutab_opened || this.is_searchtab_opened){
          return this.nav_mode;
        } else {
          return '';
        }
      }

    };
    // a component for this particular template
    return CustomDynamicComponent;
  }
  protected createComponentModule (componentType: any) {
      @NgModule({
        imports: [
          BrowserModule,
          FormsModule,
          FooterModule
        ],
        declarations: [
          componentType,
          MenuItemComponent,
          MenuSearchComponent,
        ]
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
