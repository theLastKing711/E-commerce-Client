import { DeleteConfirmationDialogService } from './../../shared/delete-confirmation-dialog.service';
import { SubSink } from 'subsink';
import { PaginationService } from './../../services/pagination.service';
import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { AddCategoryDialogComponent } from './../add-category-dialog/add-category-dialog.component';
import { Category } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, Subject, Observable, withLatestFrom, filter, pipe } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [PaginationService]
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
      private deleteConfirmationService: DeleteConfirmationDialogService,
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

    this.initPageNumberSubscription();
    this.initCategoryReomvedSubscriptions();
    this.initUserAddedSubsciptions();

  }

  initPageNumberSubscription(): void {

    this.subs.sink = this.pageNumber$
    .pipe(
      this.pageNumberDependentsLatestValues(),
      switchMap(
        ([pageNumber, pageSize]) =>
        {
          const pageIndex = pageNumber as number;

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



  pageNumberDependentsLatestValues() {

    return pipe(
              withLatestFrom(
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
                                            this.alertifyService.success("user added successfully")
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
      this.alertifyService.success("category removed successfully")
      this.paginationService.setPageNumberAfterDelete()
    })

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
