import { SubSink } from 'subsink';
import { PaginationService } from './../../services/pagination.service';
import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { AddCategoryDialogComponent } from './../add-category-dialog/add-category-dialog.component';
import { Category } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, switchMap, Subject, Observable, tap, merge, combineLatest, withLatestFrom, startWith, pipe, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  usersSelectionModel: EnhancedSelectionModel<Category> = new EnhancedSelectionModel<Category>(true);
  subs: SubSink = new SubSink();
  categoriesList$!: Observable<Category[]>;
  pageNumber$: Observable<number>;
  pageSize$: Observable<number>;
  totalCount$!: Observable<number>;
  loading: boolean = false;
  displayedColumns: string[] = ['selection', 'id', 'name', 'createdAt', 'details'];

  removeCategories: Subject<number[]> = new Subject<number[]>();
  removeCategories$: Observable<number[]> = this.removeCategories.asObservable();


  constructor(
      private categoryService: CategoryService,
      public dialog: MatDialog,
      private dialogService :DialogService,
      private alertifyService: AlertifyService,
      private paginationService: PaginationService
    ) {
      this.pageNumber$= this.paginationService.pageNumber$;
      this.pageSize$ = this.paginationService.pageSize$;
      this.totalCount$ = this.paginationService.totalCount$;

      this.categoriesList$ = this.categoryService.categories$;

  }

  ngOnInit(): void {

    this.loading = true;

    this.initCategoryReomvedSubscriptions();
    this.initPageNumberSubscriptions();
    this.initUserAddedSubsciptions();

  }

  initPageNumberSubscriptions(): void {

    this.handlePageNumberChange();

    // this.handlePageNumberDependentsChange();

  }


  handlePageNumberChange(): void {

    this.subs.sink = this.tablePageNumberVariables()
    .pipe(
      switchMap(
        ([pageNumber, pageSize]) =>
        {
          const pageIndex = pageNumber;

          return this.categoryService.getCategories(pageIndex, pageSize)
        }
      ),
    )
    .subscribe(
    {
      next: (paginatedCategories) => {

        this.categoryService.setCategoreis([...paginatedCategories.data])
        this.paginationService.setTotalCount(paginatedCategories.totalCount)
        this.clearSelections()

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    }
    );

  }

  tablePageNumberVariables() {

    return this.pageNumber$.pipe(
                              withLatestFrom(
                                // this.delayedInitializedSearch$.pipe(startWith("-1")),
                                 this.pageSize$,
                            ))

  }

  initUserAddedSubsciptions(): void {

    this.subs.sink = this.dialogService.addUser$
                      .pipe(
                        withLatestFrom(this.pageNumber$, this.pageSize$),
                        switchMap( ([addedUser, pageNumber, pageSize]) => this.categoryService.getCategories(pageNumber, pageSize) )
                      )
                      .subscribe(
                        {
                          next: (paginatedCategories) => {

                            this.categoryService.setCategoreis([...paginatedCategories.data])
                            this.paginationService.setTotalCount(paginatedCategories.totalCount)
                            this.clearSelections()

                            this.loading = false;
                          },
                          error: () => {
                            this.loading = false;
                          },
                        }
                      )
  }

  initCategoryReomvedSubscriptions(): void {
    this.subs.sink = this.removeCategories$.pipe(
      switchMap((ids) => this.deleteUserDialogClosed("200", "200", "do you want to delete the selected users")
      .pipe(
        filter(isFormSubmitted => isFormSubmitted == true),
        switchMap(() => this.categoryService.removeCategories(ids)),
      )
     )
    )
    .subscribe(() => {
      this.paginationService.setPageNumberAfterDelete()
    })

  }

  // handlePageNumberDependentsChange(): void  {

  //   this.handleSearchInputChange();
  //   this.handleUseradded();

  // }

  // handleSearchInputChange(): void {
  //   this.subs.sink = this.delayedInitializedSearch$
  //                        .pipe(tap(x => console.log("users 1", x)))
  //                        .subscribe(_ => this.paginationService.setPageNumber(1));
  // }

  // handleUseradded(): void {

  //   this.subs.sink = this.addDialogService.subject$
  //                         .subscribe(_ => this.paginationService.setPageNumber(1));

  // }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteUserDialogClosed(enterAnimationDuration: string, exitAnimationDuration: string, data: any): Observable<any> {

    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    })

    return confirmationDialogRef.afterClosed();

  }

  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.paginationService.setPageNumber(nextPage)
  }

  clearSelections(): void {
    this.usersSelectionModel.clearSelections();
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel)
  }

  fillSelections(list: Category[]) {

    this.usersSelectionModel.fillSelections(list);
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel)

  }

  toggleSelection(item: Category)
  {
    this.usersSelectionModel.toggleSelection(item);
    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  initSelections(list: Category[]) {

    this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel);
  }

  ngOnDestroy(): void {

    this.subs.unsubscribe();
  }


}
