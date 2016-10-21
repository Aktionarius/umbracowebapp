import {Component, OnInit} from '@angular/core';
import {HttpService} from "./http.service";
import {DataParseService} from "./services/DataParseService";
import {IMenuItem} from "./model/IMenuItem";
import {Router, Routes} from "@angular/router";
import {PageComponent} from "./page/page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Umbraco + Angular2';
  menuItems:IMenuItem[]=[];

  constructor(private http: HttpService, private dataParse: DataParseService, private router:Router) {

  }

  ngOnInit(): void {
    this.http.getMenu().then(response=>{
      this.menuItems=this.dataParse.parseMenuDataToNav(response);

    })
  }
}
