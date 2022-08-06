import { AppUser } from 'src/types/appUser';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserDialogService {

  subject: Subject<AppUser> = new Subject<AppUser>();

  sendUser(appUser: AppUser) {

    this.subject.next(appUser)

  }

  constructor() { }
}
