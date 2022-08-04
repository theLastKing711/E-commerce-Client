import { Invoice } from './../../types/invoice';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from 'src/types/base';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoicesUrl: string = `${environment.base_url}invoices/`;

  constructor(private httpClient: HttpClient) {}

  getInvoices(pageNumber: number, pageSize: number) {
      const params = new HttpParams().set('pageNumber', pageNumber)
                                    .set('pageSize', pageSize);

      return this.httpClient.get<IPagination<Invoice>>(this.invoicesUrl, { params: params });
  }


}



  // getProductById(id: number): Observable<Product> {

  //   const getProductUrl: string = `${this.productsUrl}${id}`;

  //   return this.httpClient.get<Product>(getProductUrl)
  // }

  // addProduct(product: FormData): Observable<Product> {
  //   return this.httpClient.post<Product>(`${environment.base_url}products`, product);
  // }

  // updateProduct(product: FormData, id: number): Observable<Product> {

  //   const updateProductUrl: string = `${this.productsUrl}${id}`;

  //   return this.httpClient.put<Product>(updateProductUrl, product)
  // }

  // removeProduct(id: number) {

  //   const removeProductUrl: string = `${this.productsUrl}${id}`;

  //   return this.httpClient.delete(removeProductUrl)
  // }

