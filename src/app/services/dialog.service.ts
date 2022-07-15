import { AddCategory } from './../../types/category';
import { Base } from './../../types/base';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  subject: Subject<AddCategory> = new Subject<AddCategory>();

  constructor() { }

}
