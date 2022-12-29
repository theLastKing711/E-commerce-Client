import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryItemDto } from 'src/types/category';
import { ProductItemDto } from 'src/types/product';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { StatsService } from 'src/app/services/stats.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HeaderBackDropService } from 'src/app/services/header-back-drop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


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

    this.searchSubscrption = this.statsService.searchItems(query)
                                              .subscribe(searchResult => {
                                                console.log("search result", searchResult);
                                                this.productsSearchList = [...searchResult.productListDto];
                                                this.categorySearchList = [...searchResult.categoryListDto];
                                              })
  }


  onBlur(e: any)
  {
    this.headerBackDropService.deActivateBackDrop();
  }

  isLoggedIn() {
    return this.storageService.isAuthenticated();
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
