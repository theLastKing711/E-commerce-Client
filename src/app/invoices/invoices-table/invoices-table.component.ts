import { environment } from './../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invoice, InvoiceDetails } from 'src/types/invoice';
import { state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})
export class InvoicesTableComponent implements OnInit {


  imagesPath: string = environment.imagesPath;

  @Input() invoicesList!: Invoice[];
  @Input() columnNames!: string[];
  @Input() invoiceDetailsColumns!: string[];

  @Output() InvoiceRemoved: EventEmitter<number> = new EventEmitter<number>();


  expandedElement!: Invoice | null;


  constructor() { }

  ngOnInit(): void {
    console.log("invoicesList", this.invoiceDetailsColumns);
  }


  removeInvoice(id: number) {
    this.InvoiceRemoved.emit(id);
  }

}
function animate(arg0: string): import("@angular/animations").AnimationMetadata | import("@angular/animations").AnimationMetadata[] {
  throw new Error('Function not implemented.');
}

