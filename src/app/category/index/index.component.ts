import { PaginationService } from './../../services/pagination.service';
import { AlertifyService } from './../../services/alertify.service';
import { DialogService } from './../../services/dialog.service';
import { AddCategoryDialogComponent } from './../add-category-dialog/add-category-dialog.component';
import { Category } from './../../../types/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  CategoriesSubscription!: Subscription;
  removeCategorySubscription!: Subscription;

  categoriesList!: Category[]

  pageNumber: number = 1;

  pageSize: number = 10;

  totalCount!: number;

  loading: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'details', 'delete'];

  constructor(
      private categoryService: CategoryService,
      public dialog: MatDialog,
      private dialogService :DialogService,
      private alertifyService: AlertifyService,
      private paginationService: PaginationService
    ) { }

  ngOnInit(): void {
    this.getCategories(this.pageNumber, this.pageSize);

    this.dialogService.subject.subscribe(newCategory => {
      this.getCategories(this.pageNumber, this.pageSize);
    })

  }

  getCategories(pageNumber: number, pageSize: number) {

    this.loading = true;

    this.CategoriesSubscription = this.categoryService.getCategories(pageNumber, pageSize)
                              .subscribe(paginatedCategories => {

                                this.categoriesList = [...paginatedCategories.data]
                                this.pageNumber = paginatedCategories.pageNumber
                                this.pageSize = paginatedCategories.pageSize;
                                this.totalCount = paginatedCategories.totalCount;

                                this.loading = false;

                              })

  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  removeCategory(id: number) {


    this.categoryService.removeCategory(id)
                        .pipe(switchMap(
                                () => {

                                  if(this.paginationService.notFirstPage() && this.paginationService.pageEnded())
                                  {
                                    return this.categoryService.getCategories(this.pageNumber - 1, this.pageSize)
                                  }

                                  return this.categoryService.getCategories(this.pageNumber, this.pageSize)
                                })
                        )
                        .subscribe(paginatedCategories => {

                          this.alertifyService.error("Category deleted successfully")

                          this.categoriesList = [...paginatedCategories.data]
                          this.pageNumber = paginatedCategories.pageNumber
                          this.pageSize = paginatedCategories.pageSize;
                          this.totalCount = paginatedCategories.totalCount;

                        })

  }

  changePage(e: PageEvent) {


    const nextPage = e.pageIndex + 1;

    this.getCategories(nextPage, this.pageSize);
  }

  ngOnDestroy(): void {
      this.CategoriesSubscription.unsubscribe();

      if(this.removeCategorySubscription){
        this.removeCategorySubscription.unsubscribe();
      }

  }


}
