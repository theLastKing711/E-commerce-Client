import { AuthGuard } from './../auth/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { IndexComponent } from './index/index.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';


@NgModule({
  declarations: [
    IndexComponent,
    AddCategoryDialogComponent,
    CategoriesTableComponent,
    CategoryDetailsComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
