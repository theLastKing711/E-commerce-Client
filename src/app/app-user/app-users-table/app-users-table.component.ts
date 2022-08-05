import { AppUser } from 'src/types/appUser';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-users-table',
  templateUrl: './app-users-table.component.html',
  styleUrls: ['./app-users-table.component.scss']
})
export class AppUsersTableComponent implements OnInit {


  @Input() appUsersList!: AppUser[];
  @Input() displayedColumns!: string[];
  @Output() appUserRemoved: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  removeAppUser(id: number) {
    this.appUserRemoved.emit(id);
  }

}
