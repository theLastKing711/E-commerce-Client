import { RoleManagerService } from './role-manager.service';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { IResponse, IRegister, ILogin, IToken, Role } from './../../types/auth';
import {  Observable, tap, } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private storageService: StorageService,
              private alertifyService: AlertifyService,
              private router: Router,
              private roleService: RoleManagerService
             ) { }

  authUrl: string = `${environment.base_url}authenticate/`;

  register(user: IRegister): Observable<IResponse> {

    const registerUrl = `${this.authUrl}register`;

    return this.httpClient.post<IResponse>(registerUrl, user);

  }

  login(user: ILogin): Observable<IToken> {

    const loginUrl = `${this.authUrl}login`;

    return this.httpClient.post<IToken>(loginUrl, user).pipe(
      tap(result => {

            this.storageService.addToStorage("access_token", result);

            if(this.roleService.userHasRole(Role.User))
            {
              this.logout();
            }
            else {
              this.alertifyService.success(`Welcome ${result.username}`);
              this.router.navigate(['/categories'])
            }

          })
    )
  }

  logout() {
    this.storageService.removeFromStorage("access_token")
  }

  getToken(): string | null {

    const token = this.storageService.getFromStroage("access_token") as IToken;

    if(token != null && typeof token != "string") {
      return token.token
    }

    return null
  }

  getUsername(): string {

    const token = this.storageService.getFromStroage("access_token") as IToken;

    if(token != null && typeof token != "string") {
      return token.username
    }

    return "";

  }

}
