import { IResponse, IRegister, ILogin, IToken } from './../../types/auth';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  authUrl: string = `${environment.base_url}authenticate/`;

  register(user: IRegister): Observable<IResponse> {

    const registerUrl = `${this.authUrl}register`;

    return this.httpClient.post<IResponse>(registerUrl, user);

  }

  login(user: ILogin): Observable<IToken> {

    const loginUrl = `${this.authUrl}login`;

    return this.httpClient.post<IToken>(loginUrl, user);

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

  getToken(): string | null {
    const token = this.storageService.getFromStroage<IToken>("access_token");

    if(token != null && typeof token != "string") {
      return token.token
    }

    return null

  }


}
