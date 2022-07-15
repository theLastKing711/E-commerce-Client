
import { Observable, tap } from 'rxjs';
import { BaseService } from './base.service';
import { Category, CategoryBase, AddCategory } from './../../types/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from 'src/types/base';
import { Product } from 'src/types/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl: string = `${environment.base_url}categories/`;

  constructor(private httpClient: HttpClient) {
  }

  getCategories(pageNumber: number, pageSize: number): Observable<IPagination<Category>> {


    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize);

    return this.httpClient.get<IPagination<Category>>(this.categoriesUrl, { params: params })
  }

  getCategoryById(id: number): Observable<Category> {

    const getCategoryUrl: string = `${this.categoriesUrl}${id}`;

    return this.httpClient.get<Category>(getCategoryUrl)
  }

  addCategory(category: AddCategory): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.base_url}categories`, category);
  }

  updateCategory(category: AddCategory, id: number): Observable<Category> {

    const updateCategoryUrl: string = `${this.categoriesUrl}${id}`;

    return this.httpClient.put<Category>(updateCategoryUrl, category)
  }

  removeCategory(id: number): Observable<boolean> {

    const removeCategoryUrl: string = `${this.categoriesUrl}${id}`;

    return this.httpClient.delete<boolean>(removeCategoryUrl)
  }

  getCategoryList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.categoriesUrl}list`);
  }

  getCategoryProducts(id: number, pageNumber: number, pageSize: number): Observable<IPagination<Product>> {

    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize);

    return this.httpClient.get<IPagination<Product>>(`${this.categoriesUrl}${id}/products`, {params: params});
  }

}
