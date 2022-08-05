import { AddAppUserDialogComponent } from './../add-app-user-dialog/add-app-user-dialog.component';
import { AppUser } from 'src/types/appUser';
import { ProductDialogService } from './../../services/product-dialog.service';
import { CategoryService } from './../../services/category.service';
import { Category, CategoryBase } from './../../../types/category';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from './../../services/alertify.service';
import { Product } from './../../../types/product';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AppUserService } from 'src/app/services/app-user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  AppUsersSubscription!: Subscription;

  appUserDaliogSubscription!: Subscription;

  appUsersList!: AppUser[];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount!: number;

  loading: boolean = false;


  displayedColumns: string[] = ['id', 'username', 'email', 'createdAt',  'details', 'delete'];

  constructor(
     private alertifyService: AlertifyService,
     private dialog: MatDialog,
     private appUserService: AppUserService,
     private productDialogService: ProductDialogService
  ) { }

  ngOnInit(): void {
    this.getAppUsers(this.pageNumber, this.pageSize);

    // this.appUserDaliogSubscription = this.productDialogService.subject.subscribe(result => {
    //   this.getAppUsers(1, this.pageSize)
    // })
  }

  getAppUsers(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.AppUsersSubscription = this.appUserService.getAppUsers(pageNumber, pageSize)
                        .subscribe(paginatedAppUsers => {


                          this.appUsersList = [...paginatedAppUsers.data]
                          this.pageNumber = paginatedAppUsers.pageNumber,
                          this.pageSize = paginatedAppUsers.pageSize,
                          this.totalCount = paginatedAppUsers.totalCount

                          this.loading = false;

                        })
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddAppUserDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.getAppUsers(nextPage, this.pageSize);
  }

  removeAppUser(id: number) {
    this.appUserService.removeAppUser(id);
  }

  ngOnDestroy(): void {
      this.AppUsersSubscription.unsubscribe();

      if(this.appUserDaliogSubscription) {
        this.appUserDaliogSubscription.unsubscribe();
      }


  }

}
