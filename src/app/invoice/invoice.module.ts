import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { IndexComponent } from '../invoices/index/index.component';
import { InvoicesTableComponent } from '../invoices/invoices-table/invoices-table.component';
import { InvoiceDetailsTableComponent } from '../invoices/invoice-details-table/invoice-details-table.component';


@NgModule({
  declarations: [
    IndexComponent,
    InvoicesTableComponent,
    InvoiceDetailsTableComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,

  ]
})
export class InvoiceModule { }
