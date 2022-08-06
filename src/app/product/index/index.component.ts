import { ProductDialogService } from './../../services/product-dialog.service';
import { CategoryService } from './../../services/category.service';
import { CategoryBase } from './../../../types/category';
import { PageEvent } from '@angular/material/paginator';
import { AddProductDialogComponent } from './../add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from './../../../types/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  productsSubscription!: Subscription;
  categoryProductsSubscription!: Subscription;
  productDaliogSubscription!: Subscription;

  productsList!: Product[];
  pageNumber: number = 1;
  pageSize: number = 9;
  totalCount!: number;
  categoryId: number = 0;

  loading: boolean = false;

  CategoriesSelectList!: CategoryBase[]

  displayedColumns: string[] = ['id', 'name', 'category', 'createdAt',  'details', 'delete'];

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
     private dialog: MatDialog,
     private productDialogService: ProductDialogService
  ) { }

  ngOnInit(): void {

    this.getProducts(this.pageNumber, this.pageSize);

    this.productDaliogSubscription = this.productDialogService.subject.subscribe(result => {
      this.getProducts(1, this.pageSize)
    })

  }

  getProducts(pageNumber: number, pageSize: number) {

    this.loading = true;
    this.productsSubscription = this.productService.getProductsAndCategoriesList(pageNumber, pageSize)
                        .subscribe(categoriesAndProducts => {

                          const [paginatedProducts, categoriesList] = categoriesAndProducts;

                          this.productsList = [...paginatedProducts.data]
                          this.pageNumber = paginatedProducts.pageNumber,
                          this.pageSize = paginatedProducts.pageSize,
                          this.totalCount = paginatedProducts.totalCount

                          this.CategoriesSelectList = [...categoriesList];

                          this.loading = false;

                        })

  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(AddProductDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.getProducts(nextPage, this.pageSize);
  }

  filterProducts(e: MatSelectChange){

    const categoryId = e.value
    this.categoryId = categoryId;

    if(categoryId == 0) {
      this.getProducts(1, this.pageSize)
    }
    else {
      this.loading = true;
      this.categoryService.getCategoryProducts(categoryId, 1, this.pageSize)
                        .subscribe(paginatedProducts => {
                          this.productsList = [...paginatedProducts.data]
                          this.pageNumber = paginatedProducts.pageNumber,
                          this.pageSize = paginatedProducts.pageSize,
                          this.totalCount = paginatedProducts.totalCount
                          this.loading = false;
                        })
    }

  }

  ngOnDestroy(): void {

      this.productsSubscription.unsubscribe();

      if(this.categoryProductsSubscription) {
        this.categoryProductsSubscription.unsubscribe();
      }

      if(this.productDaliogSubscription) {
        this.productDaliogSubscription.unsubscribe();
      }

  }

}
