import { TableSearchService } from 'src/app/table-search.service';
import { DeleteConfirmationDialogService } from './../../shared/delete-confirmation-dialog.service';
import { SubSink } from 'subsink';
import { PaginationService } from './../../services/pagination.service';
import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { AddCategoryDialogComponent } from './../add-category-dialog/add-category-dialog.component';
import { Category } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, Subject, Observable, filter, pipe, tap, UnaryFunction, startWith, BehaviorSubject, withLatestFrom, skip } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [PaginationService, TableSearchService]
})
export class IndexComponent implements OnInit, OnDestroy {

  usersSelectionModel: EnhancedSelectionModel<Category> = new EnhancedSelectionModel<Category>(true);

  subs: SubSink = new SubSink();

  categoriesList$!: Observable<Category[]>;
  pageNumber$: Observable<number>;
  pageSize$: Observable<number>;
  totalCount$!: Observable<number>;
  delayedInitializedSearch$!: Observable<string>;

  loading: boolean = false;
  displayedColumns: string[] = ['selection', 'id', 'name', 'createdAt', 'details'];

  removeCategories: Subject<number[]> = new Subject<number[]>();
  removeCategories$: Observable<number[]> = this.removeCategories.asObservable();

  sortHeader$!: Observable<Sort>;

  constructor(
      private categoryService: CategoryService,
      public dialog: MatDialog,
      private deleteConfirmationService: DeleteConfirmationDialogService,
      private dialogService: DialogService,
      private alertifyService: AlertifyService,
      private paginationService: PaginationService,
      private searchTableService: TableSearchService,
    ) {
      this.pageNumber$= this.paginationService.pageNumber$;
      this.pageSize$ = this.paginationService.pageSize$;
      this.totalCount$ = this.paginationService.totalCount$;

      this.categoriesList$ = this.categoryService.categories$;
      this.sortHeader$ = this.categoryService.sortHeader$;

      this.delayedInitializedSearch$ = this.searchTableService.query$;

  }

  ngOnInit(): void {

    this.initPageNumberSubscription();
    this.InitPageNumberDependentsSubsriptions();
    this.initCategoryRemovedSubscription();
    this.initCategoryAddedSubsciption();

  }

  initPageNumberSubscription(): void {

    this.subs.sink = this.pageNumber$
                          .pipe(
                            this.pageNumberDependentsLatestValues(),
                            switchMap(
                              ([pageNumber, query, pageSize, sort]) =>
                              {
                                // alert("asldkss")
                                this.loading = true;
                                const pageIndex = pageNumber;

                                return this.categoryService.getCategories(pageIndex, pageSize, query, sort)
                              }
                            ),
                          )
                          .subscribe(
                          {
                            next: (paginatedCategories) => {
                              // alert("testing")
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



  pageNumberDependentsLatestValues(): UnaryFunction<Observable<number>, Observable<[number,string, number, Sort]>> {

    return pipe(
              withLatestFrom(
                this.delayedInitializedSearch$.pipe(startWith("-1")),
                this.pageSize$,
                this.sortHeader$
            ))

  }


  InitPageNumberDependentsSubsriptions(): void  {

    this.InitSearchInputChangeSubscription();
    this.InitSortHeaderChangedSubscription();

  }

  InitSearchInputChangeSubscription(): void {

    this.subs.sink = this.delayedInitializedSearch$
                         .pipe(tap(x => console.log("users 1", x)))
                         .subscribe(_ => this.paginationService.setPageNumber(1));

  }

  InitSortHeaderChangedSubscription(): void {

    this.subs.sink = this.sortHeader$
                         .pipe(skip(1))
                         .subscribe(_ => this.paginationService.setPageNumber(1))

  }


  initCategoryAddedSubsciption(): void {
    this.subs.sink = this.dialogService.addUser$
                                       .pipe(
                                        withLatestFrom(this.pageNumber$, this.pageSize$, this.delayedInitializedSearch$, this.sortHeader$),
                                        switchMap(
                                          ([categoryAdded, pageNumber, pageSize, query, sort]) => this.categoryService.getCategories(pageNumber, pageSize, query, sort)
                                        )
                                      )
                                      .subscribe(
                                        {
                                          next: (paginatedCategories) => {
                                            this.alertifyService.success("Category added successfully")
                                            this.categoryService.setCategoreis([...paginatedCategories.data])
                                            this.paginationService.setTotalCount(paginatedCategories.totalCount)
                                            this.clearSelections()

                                            this.loading = false;
                                          },
                                          error: () => {
                                            this.loading = false;
                                          }
                                        }
                                      )
  }

  initCategoryRemovedSubscription(): void {

    this.subs.sink = this.removeCategories$.pipe(
      switchMap((ids) => this.deleteUserDialogClosed("200", "200", "do you want to delete the selected users")
      .pipe(
        filter((isFormSubmitted: boolean) => isFormSubmitted == true),
        switchMap(() => this.categoryService.removeCategories(ids)),
      )
     )
    )
    .subscribe(() => {
      this.alertifyService.success("category removed successfully")
      this.paginationService.setPageNumberAfterDelete()
    })

  }


  sortChanged(sort: Sort) {
    this.categoryService.setSortHeader(sort);
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteUserDialogClosed(enterAnimationDuration: string, exitAnimationDuration: string, data: any): Observable<any> {

    return this.deleteConfirmationService
               .openDeleteConfirmationDialog(
                  enterAnimationDuration,
                  exitAnimationDuration,
                  data
               )

  }

  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.paginationService.setPageNumber(nextPage)
  }

  clearSelections(): void {
    this.usersSelectionModel.clearSelections();
    // this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel)
  }

  fillSelections(list: Category[]) {

    this.usersSelectionModel.fillSelections(list);
    // this.usersSelectionModel = this.usersSelectionModel.initSelections(this.usersSelectionModel)

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
