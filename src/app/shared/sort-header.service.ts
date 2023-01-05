import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SortHeaderService {


  private sortHeader: BehaviorSubject<Sort> = new BehaviorSubject<Sort>({active: '-1', direction: ''} as Sort);
  sortHeader$: Observable<Sort> = this.sortHeader.asObservable();
  setSortHeader(sort: Sort)
  {
    this.sortHeader.next(sort);
  }
}
