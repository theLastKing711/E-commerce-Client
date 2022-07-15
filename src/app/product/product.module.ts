import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { IndexComponent } from './index/index.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    IndexComponent,
    ProductsTableComponent,
    AddProductDialogComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
