import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderBackDropService {

  backdropSubject: Subject<boolean> = new Subject<boolean>;

  backdrop$: Observable<boolean> = this.backdropSubject.asObservable();

  constructor() { }


  public activateBackDrop() {
    this.backdropSubject.next(true);
  }

  public deActivateBackDrop() {
    this.backdropSubject.next(false);
  }

}
