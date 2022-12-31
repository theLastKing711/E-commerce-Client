import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoicesTableComponent } from './invoices-table/invoices-table.component';
import { IndexComponent } from './index/index.component';
import { InvoiceDetailsTableComponent } from './invoice-details-table/invoice-details-table.component';
import { AddInvoiceDialogComponent } from './add-invoice-dialog/add-invoice-dialog.component';



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
