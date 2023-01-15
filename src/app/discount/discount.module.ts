import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { IndexComponent } from './index/index.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';
import { AddDiscountDialogComponent } from './add-discount-dialog/add-discount-dialog.component';


@NgModule({
  declarations: [
    IndexComponent,
    DiscountDetailsComponent,
    AddDiscountDialogComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    SharedModule,
  ]
})
export class DiscountModule { }
