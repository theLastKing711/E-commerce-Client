import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class PaginationService {

  private pageNumber: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private pageSize: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  private totalCount: BehaviorSubject<number> = new BehaviorSubject<number>(4);

  pageNumber$: Observable<number> = this.pageNumber.asObservable();
  pageSize$: Observable<number> = this.pageSize.asObservable();
  totalCount$: Observable<number> = this.totalCount.asObservable();

  private get prevPageNumber() {
    return this.pageNumber.value - 1;
  }

  private get currentPageNumber() {
    return this.pageNumber.value;
  }

  setPageNumber(value: number) {
    this.pageNumber.next(value);
  }

  setPageSize(value: number) {
    this.pageSize.next(value);
  }

  setTotalCount(value: number) {
    this.totalCount.next(value)
  }

  setPageNumberAfterDelete() {

    if(this.notFirstPage() && this.pageEnded())
    {
      this.setPageNumber(this.prevPageNumber)
    }
    else {
      this.setPageNumber(this.currentPageNumber)
    }

  }

  notFirstPage() {

    return this.pageNumber.value !== 1
  }

  pageEnded() {

    return this.totalCount.value - 1 === (this.pageSize.value * this.currentPageNumber) - this.pageSize.value;
  }

}
