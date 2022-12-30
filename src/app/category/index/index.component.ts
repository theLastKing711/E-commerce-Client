import { SubSink } from 'subsink';
import { PaginationService } from './../../services/pagination.service';
import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { AddCategoryDialogComponent } from './../add-category-dialog/add-category-dialog.component';
import { Category } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, switchMap, Subject, Observable, tap, merge } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EnhancedSelectionModel } from 'src/app/shared/utils/EnhancedSelectionModel';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  usersSelectionModel: EnhancedSelectionModel<Category> = new EnhancedSelectionModel<Category>(true);
  subs: SubSink = new SubSink();
  categoriesList!: Category[]
  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount!: number;
  loading: boolean = false;
  displayedColumns: string[] = ['selection', 'id', 'name', 'createdAt', 'details'];

  removeCategory: Subject<number> = new Subject<number>();
  removeCategory$: Observable<number> = this.removeCategory.asObservable();

  constructor(
      private categoryService: CategoryService,
      public dialog: MatDialog,
      private dialogService :DialogService,
      private alertifyService: AlertifyService,
      private paginationService: PaginationService
    ) { }

  ngOnInit(): void {

    this.loading = true;

    const getcategories$ = this.categoryService.getCategories(this.pageNumber, this.pageSize)

    this.subs.sink = merge(this.paginationService.pageNumber$, this.dialogService.addUser$)
                          .pipe(
                            tap(_ => this.loading = true),
                            switchMap(() =>  getcategories$)
                          )
                          .subscribe(
                            {
                              next: (paginatedCategories) => {
                                this.categoriesList = [...paginatedCategories.data]
                                this.pageNumber = paginatedCategories.pageNumber
                                this.pageSize = paginatedCategories.pageSize;
                                this.totalCount = paginatedCategories.totalCount;

                                this.loading = false;
                              },
                              error: () => {
                                this.loading = false;
                              },
                            }
                          );

    this.subs.sink = this.removeCategory$.pipe(
      tap(_ => this.loading = true),
      switchMap((id) =>  this.categoryService.removeCategory(id)),
      switchMap(
            () => {

              if(this.paginationService.notFirstPage() && this.paginationService.pageEnded())
              {
                return this.categoryService.getCategories(this.pageNumber - 1, this.pageSize)
              }
              return this.categoryService.getCategories(this.pageNumber, this.pageSize)

            })
    )
    .subscribe(
    {
      next: paginatedCategories => {

        this.alertifyService.error("Category deleted successfully")

        this.categoriesList = [...paginatedCategories.data]
        this.pageNumber = paginatedCategories.pageNumber
        this.pageSize = paginatedCategories.pageSize;
        this.totalCount = paginatedCategories.totalCount;

        this.loading = false;

      },
      error: err => {

        this.loading = false;

      }
    }
    )

  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
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
