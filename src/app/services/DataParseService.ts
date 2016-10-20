
import {Injectable} from "@angular/core";
import {Routes, Route} from "@angular/router";
import {PAGE_ALIAS} from "../constants/pages";
import {IMenuItem} from "../model/IMenuItem";
@Injectable()
export class DataParseService {

  constructor() {

  }

  parseMenuDataToRoutes(data):Routes {
    return data.data.reduce((result, currentItem)=>{
      return [...result, this.getRouteFromData(currentItem)]
    },[])
  }

  parseMenuDataToNav(data):Array<IMenuItem> {
    return data.data.reduce((result, currentItem)=>{
      if(currentItem.parentId==-1) {
        return [...result, Object.assign({}, this.mapDataObjectToMenuItem(currentItem), {
          children: this.getChildItems(currentItem.id, data.data)
        })];
      } else {
        return result;
      }
    }, []);
  }

  private getChildItems(id, data):Array<IMenuItem> {
    return data.reduce((result, currentItem)=>{
      if(currentItem.parentId==id && currentItem.navigationHide==false) {
        return [...result, Object.assign({},this.mapDataObjectToMenuItem(currentItem), {
          children: this.getChildItems(currentItem.id, data)
        })]
      }
      return result;
    }, []);
  }

  private mapDataObjectToMenuItem(object):IMenuItem {
    return {
      path: object.path,
      name: object.name
    }
  }

  private getRouteFromData(data):Route {
    return {
      path: data.path,
      component: PAGE_ALIAS[data.component],
      data: {
        title: data.name,
        meta: data.meta
      }
    }
  }
}
