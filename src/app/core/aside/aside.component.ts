import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit {

  activeRoute: string = "Categories"
  routes: {name: string, path: string}[] = [
    {name: "Categories", path: "/categories"},
    {name: "Products", path: "/products"}
  ];

  constructor() { }

  ngOnInit(): void {
  }


  updateActiveRoute(route: string) {
    this.activeRoute = route;
  }


}
