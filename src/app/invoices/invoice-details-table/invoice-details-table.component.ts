import { InvoiceDetails } from './../../../types/invoice';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-details-table',
  templateUrl: './invoice-details-table.component.html',
  styleUrls: ['./invoice-details-table.component.scss']
})
export class InvoiceDetailsTableComponent implements OnInit {

  @Input() invoiceDetailsList!: InvoiceDetails[]
  @Input() invoiceDetailsColumns!: string[]

  constructor() { }

  ngOnInit(): void {
    console.log("invoice details", this.invoiceDetailsList)
    console.log("invoice details columns", this.invoiceDetailsColumns)
  }

}
