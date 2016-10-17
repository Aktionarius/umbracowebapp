import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute} from "@angular/router";
import {SeoService} from "../services/SeoService";
import {IMetaTag} from "../model/IMetaTag";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [HttpService],
})
export class PageComponent implements OnInit {
    umbpage;
    img;
    constructor(private httpService: HttpService, private activatedRoute:ActivatedRoute, private seoService:SeoService){}

    ngOnInit(){
      // you need to set this a better way AND remove hash from url
      // you skip replace stuff on domainename and remove img
      this.activatedRoute.data.subscribe((data:any)=>{
        if(data.meta) {
          this.seoService.setMetaTags(data.meta);
        }
        if(data.title) {
          this.seoService.setTitle(data.title);
        }
      });
      this.httpService.getUmbPageData(window.location.href)
      .subscribe(
        (umbpagedata: any) => {this.umbpage = umbpagedata.data;
                               this.img = umbpagedata.data.contentImages[0].croppedUrl.replace("http://localhost/", "http://localhost:49570/");
                               console.log(umbpagedata.data.contentImages[0]);
        }
      );
    }
}
