import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableSearchService {

  private query: Subject<string> = new Subject<string>();
  query$: Observable<string> = this.query.asObservable();

  setQuery(value: string)
  {
    this.query.next(value)
  }

  constructor() { }
}
