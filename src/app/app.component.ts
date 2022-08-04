import { Observable, Subscription } from 'rxjs';
import { HeaderBackDropService } from './services/header-back-drop.service';

import { AlertifyService } from './services/alertify.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'Ecommerce-Client';

  backDropIsActive$!: Observable<boolean>;

  isSearchBarActive!: boolean;

  backdropSubscription!: Subscription;

  constructor(private storageService: StorageService, private headerBackDropService: HeaderBackDropService){

  }

  ngOnInit(): void {
    this.backDropIsActive$ = this.headerBackDropService.backdrop$;

    this.backDropIsActive$.subscribe(value => {
      this.isSearchBarActive = value;
    })

  }

  isLoggedIn(): boolean {
    return this.storageService.isAuthenticated();
  }

  ngOnDestroy(): void {
      this.backdropSubscription.unsubscribe();
  }

}
;
