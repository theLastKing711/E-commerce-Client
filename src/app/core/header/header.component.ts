import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../service/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: StorageService, private authService: AuthService,private alertifyService: AlertifyService) { }

  ngOnInit(): void {
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

}
