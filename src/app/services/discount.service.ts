import { EditDiscount, AddDiscount, Discount } from '../../types/discount';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPagination } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountsUrl: string = `${environment.base_url}discounts/`;

  private discounts: BehaviorSubject<Discount[]> = new BehaviorSubject<Discount[]>([]);
  discounts$: Observable<Discount[]> = this.discounts.asObservable();

  private sortHeader: Subject<Sort> = new BehaviorSubject<Sort>({active: '-1', direction: ''} as Sort);
  sortHeader$: Observable<Sort> = this.sortHeader.asObservable();

  constructor(private httpClient: HttpClient,
              ) {}


  checkIfDiscountDuplicated(productId: number, startDate: string, endDate: string): Observable<string> {

    const dateDuplicationUrl = `${this.discountsUrl}check-if-duplicated`

    const params = new HttpParams().set('productId', productId)
                                  .set('startDate', startDate)
                                  .set('endDate', endDate);

    return this.httpClient.get<{message: string}>(dateDuplicationUrl, {params})
                          .pipe(map(res => res.message))

  }

  checkIfDiscountDuplicatedOnUpdate(productId: number, startDate: string, endDate: string): Observable<string> {

    const dateDuplicationUrl = `${this.discountsUrl}check-if-duplicated-on-update`

    const params = new HttpParams().set('productId', productId)
                                  .set('startDate', startDate)
                                  .set('endDate', endDate);

    return this.httpClient.get<{message: string}>(dateDuplicationUrl, {params})
                          .pipe(map(res => res.message))

  }

  setdiscounts(discounts: Discount[])
  {
    this.discounts.next(discounts);
  }

  setSortHeader(sort: Sort)
  {
    this.sortHeader.next(sort);
  }

  getDiscounts(pageNumber: number, pageSize: number, query: string, sort: Sort): Observable<IPagination<Discount>> {


    const mappedDirection = this.mapDirectionToValueIfEmpty(sort);

    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize)
                                   .set('query', query)
                                   .set('active', sort.active)
                                   .set('direction', mappedDirection);

    return this.httpClient.get<IPagination<Discount>>(this.discountsUrl, { params: params })
  }

  private mapDirectionToValueIfEmpty(sort: Sort): string {
    return sort.direction == ""  ?  "-1" : sort.direction
  }

  getDiscountById(id: number): Observable<Discount> {

    const getDiscountUrl: string = `${this.discountsUrl}${id}`;

    return this.httpClient.get<Discount>(getDiscountUrl)
  }

  addDiscount(addDiscount: AddDiscount): Observable<Discount> {

    return this.httpClient.post<Discount>(`${environment.base_url}Discounts`, addDiscount);
  }

  updateDiscount(editDiscount: EditDiscount): Observable<Discount> {


    const updateDiscountUrl: string = `${this.discountsUrl}${editDiscount.id}`;

    return this.httpClient.put<Discount>(updateDiscountUrl, editDiscount)
  }

  removeDiscount(id: number): Observable<boolean> {

    const removeDiscountUrl: string = `${this.discountsUrl}${id}`;

    return this.httpClient.delete<boolean>(removeDiscountUrl)
  }

  removeDiscounts(ids: number[]) : Observable<boolean> {
    const deletediscountsUrl = `${this.discountsUrl}removeRange`;

    return this.httpClient.post<boolean>(deletediscountsUrl, ids);
  }

}
