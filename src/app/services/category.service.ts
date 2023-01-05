import { Sort } from '@angular/material/sort';

import { Observable, tap, Subject, BehaviorSubject } from 'rxjs';
import { Category } from './../../types/category';
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

  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.categories.asObservable();

  private sortHeader: Subject<Sort> = new BehaviorSubject<Sort>({active: '-1', direction: ''} as Sort);
  sortHeader$: Observable<Sort> = this.sortHeader.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  setCategoreis(categories: Category[])
  {
    this.categories.next(categories);
  }

  setSortHeader(sort: Sort)
  {
    this.sortHeader.next(sort);
  }

  getCategories(pageNumber: number, pageSize: number, query: string, sort: Sort): Observable<IPagination<Category>> {


    const mappedDirection = this.mapDirectionToValueIfEmpty(sort);

    const params = new HttpParams().set('pageNumber', pageNumber)
                                   .set('pageSize', pageSize)
                                   .set('query', query)
                                   .set('active', sort.active)
                                   .set('direction', mappedDirection);

    return this.httpClient.get<IPagination<Category>>(this.categoriesUrl, { params: params })
  }

  private mapDirectionToValueIfEmpty(sort: Sort): string {
    return sort.direction == ""  ?  "-1" : sort.direction
  }

  getCategoryById(id: number): Observable<Category> {

    const getCategoryUrl: string = `${this.categoriesUrl}${id}`;

    return this.httpClient.get<Category>(getCategoryUrl)
  }

  addCategory(categoryFormData: any): Observable<Category> {

    return this.httpClient.post<Category>(`${environment.base_url}categories`, categoryFormData);
  }

  updateCategory(updateCategoryFormData: any, id: number): Observable<Category> {

    console.log("updateCategoryFormData", updateCategoryFormData)

    const updateCategoryUrl: string = `${this.categoriesUrl}${id}`;

    return this.httpClient.put<Category>(updateCategoryUrl, updateCategoryFormData)
  }

  removeCategory(id: number): Observable<boolean> {

    const removeCategoryUrl: string = `${this.categoriesUrl}${id}`;

    return this.httpClient.delete<boolean>(removeCategoryUrl)
  }

  removeCategories(ids: number[]) : Observable<boolean> {
    const deleteCategoriesUrl = `${this.categoriesUrl}removeRange`;

    return this.httpClient.post<boolean>(deleteCategoriesUrl, ids);
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
