import { IPagination } from './../../types/base';
import { Observable, BehaviorSubject, share, shareReplay, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAppUser, AppUser } from 'src/types/appUser';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private appUsersList: BehaviorSubject<AppUser[]> = new BehaviorSubject<AppUser[]>([]);

  appUsersList$: Observable<AppUser[]> = this.appUsersList.asObservable();

  appUsersUrl = `${environment.base_url}AppUsers/`;

  constructor(private httpClient:  HttpClient) { }

  setUsers(users: AppUser[]) {
    this.appUsersList.next(users)
  }



  getAppUsers(pageNumber: number, pageSize: number, query: string, sort: Sort): Observable<IPagination<AppUser>>
  {

    const mappedDirection = this.mapDirectionToValueIfEmpty(sort);

    const getApptUsersUrl = this.appUsersUrl;

    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize)
                                   .set('query', query)
                                   .set('active', sort.active)
                                   .set('direction', mappedDirection);

    return this.httpClient.get<IPagination<AppUser>>(getApptUsersUrl, {params})

  }

  private mapDirectionToValueIfEmpty(sort: Sort): string {
    return sort.direction == ""  ?  "-1" : sort.direction
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
