import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent {

   routerSubscription!: Subscription;

    activeRoute!: string;
    routes: {name: string, path: string}[] = [
      {name: "users", path: "/users"},
      {name: "categories", path: "/categories"},
      {name: "products", path: "/products"},
      {name: "invoices", path: "/invoices"},
      {name: "stats", path: "/stats"},
    ];



}
