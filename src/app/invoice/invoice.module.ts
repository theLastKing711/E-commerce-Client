import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { IndexComponent } from '../invoices/index/index.component';
import { InvoicesTableComponent } from '../invoices/invoices-table/invoices-table.component';
import { InvoiceDetailsTableComponent } from '../invoices/invoice-details-table/invoice-details-table.component';
import { AddInvoiceDialogComponent } from '../invoices/add-invoice-dialog/add-invoice-dialog.component';


@NgModule({
  declarations: [
    IndexComponent,
    InvoicesTableComponent,
    InvoiceDetailsTableComponent,
    AddInvoiceDialogComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InvoiceModule { }
