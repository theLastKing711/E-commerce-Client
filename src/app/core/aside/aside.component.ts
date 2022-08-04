import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit, OnDestroy {

   routerSubscription!: Subscription;

    activeRoute!: string;
    routes: {name: string, path: string}[] = [
      {name: "categories", path: "/categories"},
      {name: "products", path: "/products"},
      {name: "invoices", path: "/invoices"},
      {name: "stats", path: "/stats"}
    ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.routerSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        const mainPath = "/" + event.url.split('/')[1]
        this.activeRoute = mainPath;
      }
    })

  }


  updateActiveRoute(route: string) {
    this.activeRoute = route;
  }

  ngOnDestroy(): void {
      if(this.routerSubscription)
      {
        this.routerSubscription.unsubscribe();
      }
  }

}
