import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { PaginationService } from './../../services/pagination.service';
import { AppUserDialogService } from 'src/app/services/app-user-dialog.service';
import { AddAppUserDialogComponent } from './../add-app-user-dialog/add-app-user-dialog.component';
import { AppUser } from 'src/types/appUser';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from './../../services/alertify.service';
import { Subscription, switchMap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  AppUsersSubscription!: Subscription;

  appUserDaliogSubscription!: Subscription;

  deleteUserSubscription!: Subscription;

  usersSelectionModel: EnhancedSelectionModel<AppUser> = new EnhancedSelectionModel<AppUser>(true);


  appUsersList!: AppUser[];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount!: number;

  loading: boolean = false;

  displayedColumns: string[] = ['selection', 'id', 'username', 'email', 'createdAt',  'details'];

  constructor(
     private alertifyService: AlertifyService,
     private dialog: MatDialog,
     private appUserService: AppUserService,
     private appUserDialogService: AppUserDialogService,
     private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.getAppUsers(this.pageNumber, this.pageSize);

    this.appUserDaliogSubscription = this.appUserDialogService.subject.subscribe(result => {
      this.getAppUsers(1, this.pageSize)
    })
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

  openDeleteConfirmationDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): MatDialogRef<ConfirmationDialogComponent, any> {
    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    })


    return confirmationDialogRef;

  }


  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.getAppUsers(nextPage, this.pageSize);
  }

  removeAppUsers(ids: number[]) {

    this.openDeleteConfirmationDialog("200", "200", "do you want to delete the selected users").afterClosed().subscribe(isSubmitted => {

      if(isSubmitted)
      {
              this.appUserService.removeAppUsers(ids)
              .pipe(switchMap(
                      () => {

                        if(this.paginationService.notFirstPage(this.pageNumber) && this.paginationService.pageEnded(this.totalCount, this.pageSize))
                        {
                          return this.appUserService.getAppUsers(this.pageNumber - 1, this.pageSize)
                        }

                        return this.appUserService.getAppUsers(this.pageNumber, this.pageSize)
                      })
              )
              .subscribe(paginatedUsers => {

                this.alertifyService.error("Users deleted successfully")
                this.usersSelectionModel.clearSelections();
                this.appUsersList = [...paginatedUsers.data]
                this.pageNumber = paginatedUsers.pageNumber
                this.pageSize = paginatedUsers.pageSize;
                this.totalCount = paginatedUsers.totalCount;

              })
      }
    })

  }

  initSelections(list: AppUser[]) {

    this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  clearSelections() {
    this.usersSelectionModel.clearSelections();
    this.usersSelectionModel.initSelections(this.usersSelectionModel)
  }

  fillSelections(list: AppUser[]) {

    this.usersSelectionModel.fillSelections(list);
    this.usersSelectionModel.initSelections(this.usersSelectionModel)

  }

  toggleSelection(item: AppUser)
  {
    this.usersSelectionModel.toggleSelection(item);
    this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }


  ngOnDestroy(): void {
      this.AppUsersSubscription.unsubscribe();

      if(this.appUserDaliogSubscription) {
        this.appUserDaliogSubscription.unsubscribe();
      }

      if(this.deleteUserSubscription) {
        this.deleteUserSubscription.unsubscribe();
      }


  }

}
