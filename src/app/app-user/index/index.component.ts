import { TableSearchService } from './../../table-search.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoadingService } from './../../loading.service';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { PaginationService } from './../../services/pagination.service';
import { AppUserDialogService } from 'src/app/services/app-user-dialog.service';
import { AddAppUserDialogComponent } from './../add-app-user-dialog/add-app-user-dialog.component';
import { AppUser } from 'src/types/appUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from './../../services/alertify.service';
import { Subscription, switchMap, Observable, combineLatest, distinctUntilChanged, debounceTime, startWith, merge, filter, catchError, of, tap, map, interval } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  AppUsersSubscription!: Subscription;
  appUserDaliogSubscription!: Subscription;
  deleteUserSubscription!: Subscription;
  testSub!: Subscription;
  testSub2!: Subscription;


  loading$!: Observable<boolean>;
  pageNumber$!: Observable<number>;
  pageSize$!: Observable<number>;
  totalCount$!: Observable<number>;
  appUsersList$!: Observable<AppUser[]>;
  delayedInitializedSearch$!: Observable<string>;
  userTableVariables$!: Observable<any>;

  usersSelectionModel: EnhancedSelectionModel<AppUser> = new EnhancedSelectionModel<AppUser>(true);

  public searchControl!: FormControl;

  displayedColumns: string[] = ['selection', 'id', 'username', 'email', 'createdAt',  'details'];

  constructor(
     private alertifyService: AlertifyService,
     private dialog: MatDialog,
     private appUserService: AppUserService,
     private appUserDialogService: AppUserDialogService,
     private paginationService: PaginationService,
     private loadingService: LoadingService,
     private fb: FormBuilder,
     private searchTableService: TableSearchService
  ) {
    this.appUsersList$ = this.appUserService.appUsersList$;
    this.pageNumber$ = this.paginationService.pageNumber$;
    this.pageSize$ = this.paginationService.pageSize$;
    this.loading$ = loadingService.isLoading$;
    this.searchControl = this.fb.control('');
    this.delayedInitializedSearch$ = this.searchTableService.query$;
  }

  ngOnInit(): void {

  this.userTableVariables$ = combineLatest([this.pageNumber$, this.pageSize$, this.delayedInitializedSearch$]);

  this.testSub = this.userTableVariables$
      .pipe(
        switchMap(
          ([pageNumber, pageSize, query]) =>
          {
            console.log("first")
            return this.appUserService.getAppUsers(pageNumber, pageSize, query)
          }
        ),
        tap(x => console.log("second", x)),
        tap(data => this.appUserService.setUsers([...data.data])),
        tap(data => this.paginationService.setTotalCount(data.totalCount)),
        tap(() => this.clearSelections())
      )
      .subscribe()

      this.testSub2 = of(1).pipe(
        switchMap(() => interval(1000)),
      )
      .subscribe(x => {
        console.log("x", x)
      });

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

    this.paginationService.setPageNumber(nextPage);

    // this.getAppUsers(nextPage, this.pageSize);
  }

  removeAppUsers(ids: number[]) {

    this.openDeleteConfirmationDialog("200", "200", "do you want to delete the selected users")
        .afterClosed()
        .pipe(
          filter(isFormSubmitted => isFormSubmitted == true),
          switchMap(() => this.appUserService.removeAppUsers(ids)),
          tap(() => this.paginationService.setPageNumber(1))
        )
        .subscribe();

  }

  openDeleteConfirmationDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): MatDialogRef<ConfirmationDialogComponent, any> {

    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    })

    return confirmationDialogRef;

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

  initSelections(list: AppUser[]) {

    this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  ngOnDestroy(): void {

      if(this.AppUsersSubscription)
      {
        this.AppUsersSubscription.unsubscribe();
      }

      if(this.appUserDaliogSubscription) {
        this.appUserDaliogSubscription.unsubscribe();
      }

      if(this.deleteUserSubscription) {
        this.deleteUserSubscription.unsubscribe();
      }

    console.log("test sub", this.testSub)

    this.testSub.unsubscribe();
    this.testSub2.unsubscribe();
  }

}
