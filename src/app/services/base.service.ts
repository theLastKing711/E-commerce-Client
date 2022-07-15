import { IPagination } from './../../types/base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Base } from '../../types/base';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private httpclient :HttpClient) { }


  protected getAll<T extends Base>(url: string, params?: HttpParams): Observable<IPagination<T>> {

    return this.httpclient.get<IPagination<T>>(url, {params: params})
  }

  protected getById<T extends Base>(url: string): Observable<T> {
    return this.httpclient.get<T>(url)
  }

  protected add<T, R extends Base>(url: string, payload: T):  Observable<R> {
    return this.httpclient.post<R>(url, payload)
  }

  protected update<T extends Base, R>(url: string, payload: T): Observable<R> {
    return this.httpclient.put<R>(url, payload)
  }

  protected remove(url: string) {
    return this.httpclient.delete(url);
  }

}
