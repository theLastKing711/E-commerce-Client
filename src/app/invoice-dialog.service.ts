import { Invoice } from 'src/types/invoice';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDialogService {

  subject: Subject<Invoice> = new Subject<Invoice>();

  constructor() { }
}
