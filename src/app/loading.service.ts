import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoading$: Observable<boolean> = this.isLoading.asObservable();

  showLoading() {
    this.isLoading.next(true);
  }

  hideLoading() {
    this.isLoading.next(false);
  }

  constructor() { }
}
