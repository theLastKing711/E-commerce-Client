import { Category } from './../../../types/category';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { ProductDialogService } from './../../services/product-dialog.service';
import { ProductService } from './../../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndexComponent } from '../index/index.component';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit, OnDestroy {

  categoriesListSubscription!: Subscription;

  categoriesList!: Category[];

  constructor(
      private productService: ProductService,
      private categoryService: CategoryService,
      public dialogRef: MatDialogRef<IndexComponent>,
      public dialogService: ProductDialogService,
      private alertifyService: AlertifyService
    ) {}



  loading: boolean = false;

 productForm = new FormGroup({
   name: new FormControl('', Validators.required),
   price: new FormControl('', Validators.required),
   categoryId: new FormControl('', Validators.required),
   image: new FormControl('', Validators.required)
 });

 ngOnInit(): void {

  this.getCategoriesList();

 }

 getCategoriesList() {
    this.categoriesListSubscription = this.categoryService
                                          .getCategoryList()
                                          .subscribe(categories => {
                                            this.categoriesList = [...categories]
                                          })
  }

uploadFile(e: any) {
  const file = e.target.files[0];

  this.productForm.patchValue({
    image: file
  })

 }

 formNotValid() {
  return  !this.productForm.valid
 }

 addProduct() {

  this.loading = true;


   const formData = new FormData();

   const form = this.productForm;

   const name = form.get('name')?.value!;

   const price = form.get('price')?.value!;

   const categoryId = form.get('categoryId')?.value!;

   const image = form.get('image')?.value!;

   formData.append("name", name);

   formData.append('price', price);

   formData.append('categoryId', categoryId);

   formData.append('image', image);


   this.productService.addProduct(formData)
                       .subscribe(product => {
                         this.dialogService.subject.next(product);
                         this.alertifyService.success("Product added successfully")
                         this.loading = false;
                         this.dialogRef.close();
                       })
 }


 hasError(key: string) {

   const isEmpty: boolean = this.productForm.get(key)?.value == ""

   return this.productForm.get('name')?.pristine || (isEmpty)
 }

 ngOnDestroy(): void {
     this.categoriesListSubscription.unsubscribe();
 }

}
