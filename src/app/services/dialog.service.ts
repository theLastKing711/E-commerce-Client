import { AddCategory } from './../../types/category';
import { Base } from './../../types/base';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  addUser: Subject<AddCategory> = new Subject<AddCategory>();
  addUser$: Observable<AddCategory> = this.addUser.asObservable();

}
