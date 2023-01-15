import { CategoryService } from './category.service';

import { Observable, tap, forkJoin } from 'rxjs';
import { BaseService } from './base.service';
import { Product, ProductBase, AddProduct } from './../../types/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl: string = `${environment.base_url}products/`;

  constructor(private httpClient: HttpClient,private  categoryService: CategoryService) {
  }

  getProducts(pageNumber: number, pageSize: number) {
    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize);

    return this.httpClient.get<IPagination<Product>>(this.productsUrl, { params: params });
  }

  getProductsAndCategoriesList(pageNumber: number, pageSize: number): Observable<[IPagination<Product>, Product[]]> {

    var categoriesList = this.categoryService.getCategoryList();

    var paginatedProductsList = this.getProducts(pageNumber, pageSize);

    return forkJoin([paginatedProductsList, categoriesList])

  }


  getProductAndCategoriesList(id: number): Observable<[Product, Product[]]> {

    var categoriesList = this.categoryService.getCategoryList();

    var product = this.getProductById(id);

    return forkJoin([product, categoriesList])

  }



  getProductById(id: number): Observable<Product> {

    const getProductUrl: string = `${this.productsUrl}${id}`;

    return this.httpClient.get<Product>(getProductUrl)
  }

  addProduct(product: FormData): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.base_url}products`, product);
  }

  updateProduct(product: FormData, id: number): Observable<Product> {

    const updateProductUrl: string = `${this.productsUrl}${id}`;

    return this.httpClient.put<Product>(updateProductUrl, product)
  }

  removeProduct(id: number) {

    const removeProductUrl: string = `${this.productsUrl}${id}`;

    return this.httpClient.delete(removeProductUrl)
  }

  getProductsList(): Observable<Product[]>{

    return this.httpClient.get<Product[]>(`${this.productsUrl}list`);
  }

}
