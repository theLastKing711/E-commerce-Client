import { AppUser } from 'src/types/appUser';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserDialogService {

  private subject: Subject<AppUser> = new Subject<AppUser>();

  subject$: Observable<AppUser> = this.subject.asObservable();

  sendUser(appUser: AppUser) {

    this.subject.next(appUser)

  }

  constructor() { }
}
