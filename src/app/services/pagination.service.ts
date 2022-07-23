import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }


  notFirstPage(pageNubmer: number) {

    return pageNubmer !== -1
  }

  pageEnded(count: number, pageSize: number) {
    return count - 1 === pageSize
  }

}
