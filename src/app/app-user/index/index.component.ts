import { DeleteConfirmationDialogService } from './../../shared/delete-confirmation-dialog.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { TableSearchService } from './../../table-search.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoadingService } from './../../loading.service';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { PaginationService } from './../../services/pagination.service';
import { AppUserDialogService } from 'src/app/services/app-user-dialog.service';
import { AddAppUserDialogComponent } from './../add-app-user-dialog/add-app-user-dialog.component';
import { AppUser } from 'src/types/appUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {  switchMap, Observable, startWith, filter, tap,Subject, withLatestFrom, pipe, UnaryFunction } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [PaginationService, TableSearchService]
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subs = new SubSink();

  loading$!: Observable<boolean>;
  pageNumber$!: Observable<number>;
  pageSize$!: Observable<number>;
  totalCount$!: Observable<number>;
  appUsersList$!: Observable<AppUser[]>;
  delayedInitializedSearch$!: Observable<string>;

  usersSelectionModel: EnhancedSelectionModel<AppUser> = new EnhancedSelectionModel<AppUser>(true);

  public searchControl!: FormControl;

  displayedColumns: string[] = ['selection', 'id', 'username', 'email', 'createdAt',  'details'];

  removeUsers: Subject<number[]> = new Subject<number[]>();
  removeUsers$: Observable<number[]> = this.removeUsers.asObservable();

  constructor(
     private alertifyService: AlertifyService,
     private dialog: MatDialog,
     private appUserService: AppUserService,
     private paginationService: PaginationService,
     private loadingService: LoadingService,
     private deleteConfirmationService: DeleteConfirmationDialogService,
     private fb: FormBuilder,
     private searchTableService: TableSearchService,
     private addDialogService: AppUserDialogService
  ) {
    this.appUsersList$ = this.appUserService.appUsersList$;

    this.pageNumber$ = this.paginationService.pageNumber$;
    this.pageSize$ = this.paginationService.pageSize$;
    this.totalCount$ = this.paginationService.totalCount$;

    this.loading$ = loadingService.isLoading$;
    this.searchControl = this.fb.control('');
    this.delayedInitializedSearch$ = this.searchTableService.query$
  }

  ngOnInit(): void {
    this.initUserDeletedSubscrption();
  }

  ngAfterViewInit(): void {
    this.initPageNumberRelatedSubscriptions();
  }

  initPageNumberRelatedSubscriptions(): void {

    this.initPageNumberSubscription();

    this.InitPageNumberDependentsSubsriptions();

  }


  initPageNumberSubscription(): void {

    this.subs.sink =
    this.pageNumber$.pipe(
      this.pageNumberDependentsLatestValues(),
      switchMap(
        ([pageNumber, query, pageSize, addedUser]) =>
        {
          this.loadingService.showLoading();

          const pageIndex = pageNumber;

          console.log("users 2", pageNumber)
          return this.appUserService.getAppUsers(pageIndex, pageSize, query)
        }
      ),
      tap(_ => this.loadingService.hideLoading()),
      tap(x => console.log("users 3", x)),
      tap(data => this.appUserService.setUsers([...data.data])),
      tap(data => this.paginationService.setTotalCount(data.totalCount)),
      tap(() => this.clearSelections())
    )
    .subscribe()

  }

  pageNumberDependentsLatestValues(): UnaryFunction<Observable<number>, Observable<[number, string, number, AppUser]>> {

    return pipe(
      withLatestFrom(
        this.delayedInitializedSearch$.pipe(startWith("-1")),
        this.pageSize$,
        this.addDialogService.subject$.pipe(startWith({} as AppUser))
    ))

  }

  InitPageNumberDependentsSubsriptions(): void  {

    this.InitSearchInputChangeSubscription();
    this.InitUserAddedSubscription();

  }

  InitSearchInputChangeSubscription(): void {
    this.subs.sink = this.delayedInitializedSearch$
                         .pipe(tap(x => console.log("users 1", x)))
                         .subscribe(_ => this.paginationService.setPageNumber(1));
  }

  InitUserAddedSubscription(): void {

    this.subs.sink = this.addDialogService.subject$
                         .subscribe(_ => this.paginationService.setPageNumber(1));

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

  }

  initUserDeletedSubscrption(): void {
    this.subs.sink = this.subs.sink =  this.removeUsers$.pipe(
      switchMap((ids) => this.deleteUserDialogClosed("200", "200", "do you want to delete the selected users")
      .pipe(
        filter(isFormSubmitted => isFormSubmitted == true),
        switchMap(() => this.appUserService.removeAppUsers(ids)),
      )
      )
    )
    .subscribe(() => {
      this.alertifyService.success("user removed successfully")
      this.paginationService.setPageNumberAfterDelete()
    })
  }

  deleteUserDialogClosed(enterAnimationDuration: string, exitAnimationDuration: string, data: any): Observable<any> {

    return this.deleteConfirmationService.openDeleteConfirmationDialog(
      enterAnimationDuration,
      exitAnimationDuration,
      data
    )

  }

  clearSelections(): void {
    this.usersSelectionModel.clearSelections();
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel)
  }

  fillSelections(list: AppUser[]) {

    this.usersSelectionModel.fillSelections(list);
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel)

  }

  toggleSelection(item: AppUser)
  {
    this.usersSelectionModel.toggleSelection(item);
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  initSelections(list: AppUser[]) {

    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
