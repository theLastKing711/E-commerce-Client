import { ProductService } from 'src/app/services/product.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { Observable, forkJoin } from 'rxjs';
import { AddInvoice, Invoice } from 'src/types/invoice';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from 'src/types/base';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoicesUrl: string = `${environment.base_url}invoices/`;

  constructor(private httpClient: HttpClient,
              private appUserService: AppUserService,
              private productService: ProductService
              ) {}

  getInvoices(pageNumber: number, pageSize: number) {
      const params = new HttpParams().set('pageNumber', pageNumber)
                                    .set('pageSize', pageSize);

      return this.httpClient.get<IPagination<Invoice>>(this.invoicesUrl, { params: params });

  }

  getInvoiceById(id: number): Observable<Invoice> {

    const getInvoiceUrl = `${this.invoicesUrl}${id}`

    return this.httpClient.get<Invoice>(getInvoiceUrl)
  }

  addInvoice(invoice: AddInvoice): Observable<Invoice> {

    const addInvoiceUrl = `${this.invoicesUrl}`;

    return this.httpClient.post<Invoice>(`${addInvoiceUrl}`, invoice);
  }

  removeInvoice(id: number) {

    const removeInvoiceUrl = `${this.invoicesUrl}${id}`

    return this.httpClient.delete(removeInvoiceUrl)
  }

  getProductAndUserLists() {

    const productsList = this.productService.getProducts(0, 0)

    const usersList = this.appUserService.getAppUsers(0, 0)

    return forkJoin([productsList, usersList]);

  }


}




