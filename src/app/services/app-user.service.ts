import { IPagination } from './../../types/base';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAppUser, AppUser } from 'src/types/appUser';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  appUsersUrl = `${environment.base_url}AppUsers/`;

  constructor(private httpClient:  HttpClient) { }

  getAppUsers(pageNumber: number, pageSize: number): Observable<IPagination<AppUser>>
  {

    const getApptUsersUrl = this.appUsersUrl;

    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize);

    return this.httpClient.get<IPagination<AppUser>>(getApptUsersUrl, {params});

  }

  getAppUserById(id: number): Observable<AppUser>
  {
    const getAppUserUrl = `${this.appUsersUrl}${id}`;

    return this.httpClient.get<AppUser>(getAppUserUrl)

  }

  addAppUser(appUser: any): Observable<AppUser> {

    const addAppUserUserUrl = this.appUsersUrl;

    return this.httpClient.post<AppUser>(addAppUserUserUrl, appUser);

  }

  updateAppUser(appUser: any,id: number): Observable<AppUser> {

    const updateAppUserUserUrl = `${this.appUsersUrl}${id}`;

    return this.httpClient.put<AppUser>(updateAppUserUserUrl, appUser)

  }


  removeAppUser(id: number) : Observable<boolean> {
    const deleteAppUserUserUrl = `${this.appUsersUrl}${id}`;

    return this.httpClient.delete<boolean>(deleteAppUserUserUrl);
  }

  removeAppUsers(ids: number[]) : Observable<boolean> {
    const deleteAppUserUserUrl = `${this.appUsersUrl}removeRange`;

    return this.httpClient.post<boolean>(deleteAppUserUserUrl, ids);
  }



}
