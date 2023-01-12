import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountsUrl: string = `${environment.base_url}discounts/`;

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

}
