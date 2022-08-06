import { InvoiceDialogService } from './../../invoice-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInvoiceDialogComponent } from './../add-invoice-dialog/add-invoice-dialog.component';
import { Subscription } from 'rxjs';
import { Invoice, InvoiceDetails } from './../../../types/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { AlertifyService } from 'src/app/services/alertify.service';
import { animate, state, style, transition, trigger } from '@angular/animations';




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IndexComponent implements OnInit, OnDestroy {

  invoicesSubscription!: Subscription;
  invoiceDialogSubscription!: Subscription;

  invoicesList!: Invoice[];

  pageNumber: number = 1;
  pageSize: number = 9;
  totalCount!: number;
  categoryId: number = 0;

  loading: boolean = false;

  CategoriesSelectList!: Invoice[]

  displayedColumns: string[] = ['id','createdAt', 'total', 'appUser',  'expand'];

  invoiceDetailsColumns: string[] = ['id', 'createdAt', 'productName', 'productQuantity', 'unitPrice'];


  constructor(
    private invoiceService: InvoiceService,
     private alertifyService: AlertifyService,
     private dialog: MatDialog,
     private invoiceDialogService: InvoiceDialogService
  ) { }

  ngOnInit(): void {
    this.getInvoices(this.pageNumber, this.pageSize);

    this.invoiceDialogSubscription = this.invoiceDialogService.subject.subscribe(result => {
      this.getInvoices(1, this.pageSize)
    })

  }

  getInvoices(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.invoicesSubscription = this.invoiceService.getInvoices(pageNumber, pageSize)
                        .subscribe(invoices => {

                          console.log("invoices", invoices)

                          this.invoicesList = [...invoices.data]
                          this.pageNumber = invoices.pageNumber,
                          this.pageSize = invoices.pageSize,
                          this.totalCount = invoices.totalCount

                          this.loading = false;

                        })
  }

  changePage(e: PageEvent) {

    const nextPage = e.pageIndex + 1;

    this.getInvoices(nextPage, this.pageSize);
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(AddInvoiceDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

  ngOnDestroy(): void {

      if(this.invoicesSubscription) {
        this.invoicesSubscription.unsubscribe();
      }

      if(this.invoiceDialogSubscription) {
        this.invoiceDialogSubscription.unsubscribe()
      }

  }
}
