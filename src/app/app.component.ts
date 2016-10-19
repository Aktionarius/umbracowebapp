import {Component, OnInit} from '@angular/core';
import {HttpService} from "./http.service";
import {DataParseService} from "./services/DataParseService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

   title = 'Umbraco + Angular2';
    constructor(private http:HttpService, private dataParse:DataParseService){

    }

  ngOnInit(): void {
    this.http.getMenu().subscribe((response)=> {
      console.log(response);
      try {
        console.log(this.dataParse.parseMenuDataToNav(response));
        console.log(this.dataParse.parseMenuDataToRoutes(response));
      } catch(e) {
        console.log(e);
      }

    })
  }
}
