import { query } from '@angular/animations';
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
import { Subscription, switchMap, Observable, combineLatest, distinctUntilChanged, debounceTime, startWith, merge, filter, catchError, of, tap, map, interval, share, take, shareReplay, withLatestFrom } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit, OnDestroy {

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
    this.totalCount$ = this.paginationService.totalCount$;

    this.loading$ = loadingService.isLoading$;
    this.searchControl = this.fb.control('');
    this.delayedInitializedSearch$ = this.searchTableService.query$
  }

  ngAfterViewInit(): void {

    this.initPageNumberAndDependentsChangeSubscriptions();

  }

  initPageNumberAndDependentsChangeSubscriptions(): void {

    this.handlePageNumberChange();

    this.handlePageNumberDependentsChange();

  }


  handlePageNumberChange(): void {

    this.subs.sink = this.tablePageNumberVariables()
    .pipe(
      switchMap(
        ([pageNumber, query, pageSize]) =>
        {
          const pageIndex = pageNumber;

          console.log("users 2", pageNumber)
          return this.appUserService.getAppUsers(pageIndex, pageSize, query)
        }
      ),
      tap(x => console.log("users 3", x)),
      tap(data => this.appUserService.setUsers([...data.data])),
      tap(data => this.paginationService.setTotalCount(data.totalCount)),
      tap(() => this.clearSelections())
    )
    .subscribe()

  }

  tablePageNumberVariables() {

    return this.pageNumber$.pipe(
      withLatestFrom(
        this.delayedInitializedSearch$.pipe(startWith("-1")),
        this.pageSize$
    ))

  }

  handlePageNumberDependentsChange(): void  {

    this.subs.sink = this.delayedInitializedSearch$
                         .pipe(tap(x => console.log("users 1", x)))
                         .subscribe(query => this.paginationService.setPageNumber(1));
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

  removeAppUsers(ids: number[]) {

    this.deleteUserDialogClosed("200", "200", "do you want to delete the selected users")
        .pipe(
          filter(isFormSubmitted => isFormSubmitted == true),
          switchMap(() => this.appUserService.removeAppUsers(ids)),
          tap(() => this.paginationService.setPageNumber(1))
        )
        .subscribe();

  }

  deleteUserDialogClosed(enterAnimationDuration: string, exitAnimationDuration: string, data: any):Observable<any> {

    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    })

    return confirmationDialogRef.afterClosed();

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
    this.subs.unsubscribe();
  }

}
