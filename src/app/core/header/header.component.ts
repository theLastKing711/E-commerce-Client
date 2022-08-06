import { HeaderBackDropService } from './../../services/header-back-drop.service';
import { Subscription } from 'rxjs';
import { CategoryItemDto } from './../../../types/category';
import { ProductItemDto } from './../../../types/product';
import { StatsService } from './../../services/stats.service';
import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  query!: string;
  productsSearchList!: ProductItemDto[];
  categorySearchList!: CategoryItemDto[];

  searchSubscrption!: Subscription;

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private statsService: StatsService,
              private alertifyService: AlertifyService,
              private headerBackDropService: HeaderBackDropService) { }

  ngOnInit(): void {
  }

  searchItems(e: any) {
    this.headerBackDropService.activateBackDrop();

    const query = e.target.value;
    // console.log("query", query)
    // this.query = query;
    this.searchSubscrption = this.statsService.searchItems(query)
                                              .subscribe(searchResult => {
                                                console.log("search result", searchResult);
                                                this.productsSearchList = [...searchResult.productListDto];
                                                this.categorySearchList = [...searchResult.categoryListDto];
                                              })
  }

  test() {
  }

  onBlur(e: any)
  {
    this.headerBackDropService.deActivateBackDrop();
  }

  isLoggedIn() {
    return this.storageService.isAuthenticated();
  }


  getLoggedUser() {
    return this.authService.getUser();
  }

  logout() {
    this.alertifyService.warning("Logged out successfully")
    this.storageService.removeFromStorage("access_token")
  }

  ngOnDestroy(): void {
    if(this.searchSubscrption){
      this.searchSubscrption.unsubscribe();
    }
  }
}
