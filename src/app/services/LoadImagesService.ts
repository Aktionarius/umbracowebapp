import { ImageLazyLoaderService} from "ng2-image-lazy-load"

export class LoadImagesService extends ImageLazyLoaderService {

  load(url: string, headers: Object):Promise<any> {
    console.log("load");
    return new Promise<any>((resolve, reject)=>{
      setTimeout(resolve, 2000)
    });
  }
}
