
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from 'src/types/auth';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent {

    activeRoute!: string;
    routes: {name: string, path: string, roles: Role[]}[] = [
      {name: "users", path: "/users", roles: [Role.Admin]},
      {name: "categories", path: "/categories", roles: [Role.Admin, Role.User]},
      {name: "products", path: "/products", roles: [Role.Admin, Role.User]},
      {name: "invoices", path: "/invoices", roles: [Role.Admin, Role.User]},
      {name: "stats", path: "/stats", roles: [Role.Admin, Role.User]},
    ];



}
