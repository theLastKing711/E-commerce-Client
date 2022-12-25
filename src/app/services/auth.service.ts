import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { IResponse, IRegister, ILogin, IToken, Role } from './../../types/auth';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private storageService: StorageService,
              private alertifyService: AlertifyService,
              private router: Router,
              private jwtService: JwtHelperService
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
            this.alertifyService.success(`Welcome ${result.username}`);
            this.router.navigate(['/categories'])
      })
    )

  }

  logout() {

    this.storageService.removeFromStorage("access_token")
  }

  getUser(): string | null {
    const token = this.storageService.getFromStroage<IToken>("access_token");

    if(token != null && typeof token != "string") {
      return token.username
    }

    return null
  }

}
