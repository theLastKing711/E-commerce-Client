import { StorageService } from './service/storage.service';
import { AlertifyService } from './services/alertify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Ecommerce-Client';

  constructor(private storageService: StorageService){

  }

  isLoggedIn(): boolean {
    return this.storageService.isAuthenticated();
  }

}
