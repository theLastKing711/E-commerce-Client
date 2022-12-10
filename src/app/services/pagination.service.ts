import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }


  notFirstPage(pageNumber: number) {

    return pageNumber !== -1
  }

  pageEnded(count: number, pageSize: number) {
    return count - 1 === pageSize
  }

}
