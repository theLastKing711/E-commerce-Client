import { Subject } from 'rxjs';
import { AddProduct } from './../../types/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDialogService {

  subject: Subject<AddProduct> = new Subject<AddProduct>();

  constructor() { }
}
