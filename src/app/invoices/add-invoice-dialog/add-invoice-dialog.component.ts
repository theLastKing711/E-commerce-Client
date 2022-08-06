import { AddInvoiceDetails, Invoice } from 'src/types/invoice';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'src/types/product';
import { AppUser } from 'src/types/appUser';
import { Subscription } from 'rxjs';
import { AppUserService } from 'src/app/services/app-user.service';
import { AddInvoice } from './../../../types/invoice';
import { InvoiceDialogService } from './../../invoice-dialog.service';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { IndexComponent } from '../index/index.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-invoice-dialog',
  templateUrl: './add-invoice-dialog.component.html',
  styleUrls: ['./add-invoice-dialog.component.scss']
})
export class AddInvoiceDialogComponent implements OnInit {

  userAndProductListsSubscription!: Subscription;

  usersList!: AppUser[];
  productsList!: Product[];

  invoice!: Invoice;

  constructor(private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<IndexComponent>,
    public invoiceDialogService: InvoiceDialogService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder
    ) {}



  get invoicesDetails() {
    return this.invoiceForm.controls["invoicesDetails"] as FormArray<FormGroup<{productId: FormControl<number | null>,productQuantity: FormControl<number | null>}>>
  }

  addInvoiceDetails() {

    var newInvoiceDetailsGroup = this.fb.group({
      productId: this.fb.control(0, Validators.required),
      productQuantity: this.fb.control(0, [Validators.required, Validators.min(1)])
    })

    this.invoicesDetails.push(newInvoiceDetailsGroup);

   }

   deleteInvoiceDetail(invoiceDetailIndex: number) {

    this.invoicesDetails.removeAt(invoiceDetailIndex)
   }


  invoiceForm = this.fb.group({
    appUserId: this.fb.control(null, Validators.required),
    invoicesDetails: this.fb.array([
      this.fb.group({
        productId: this.fb.control(0, Validators.required),
        productQuantity: this.fb.control(0, [Validators.required, Validators.min(1)]),
      })
    ])
  })



 ngOnInit(): void {
  this.userAndProductListsSubscription = this.invoiceService
                                              .getProductAndUserLists()
                                              .subscribe(reuslt => {
                                                this.productsList = [...reuslt[0].data]
                                                this.usersList = [...reuslt[1].data]
                                              })
 }


 addInvoice() {

  const appUserId = this.getFormControl<number>('appUserId');

  const invoiceDetailsList = this.invoicesDetails.controls.map( item => {
    return {
      productId: item.get("productId")?.value,
      productQuantity: item.get("productQuantity")?.value
    } as AddInvoiceDetails
  })

   const newIvoice : AddInvoice = {
     appUserId: appUserId,
     InvoicesDetails:invoiceDetailsList

   }

   console.log("new Invoice", newIvoice)

   this.invoiceService.addInvoice(newIvoice)
                       .subscribe(invoice => {
                         this.invoiceDialogService.subject.next(invoice);
                         this.alertifyService.success("Invoice added successfully")
                         this.dialogRef.close();
                       })

 }

 getFormControl<T>(key: string): T
 {
  return this.invoiceForm.get(key)?.value;
 }

  formArrayControlHasEmptyError(index: number, key: string) {

    const control = this.invoicesDetails.at(index).get(key)

    const isEmpty = control?.hasError("required")

    const isTouched = control?.touched;

    return  isEmpty && isTouched

  }

  formArrayControlMinError(index: number, key: string) {

    const control = this.invoicesDetails.at(index).get(key)

    const hasMinError = control?.hasError("min")

    const isTouched = control?.touched;

    return  hasMinError && isTouched

  }


  hasError(key: string) {

    const control = this.invoiceForm.get(key)

    const isEmpty = control?.hasError('required')

    const isTouched = control?.touched;

    return isEmpty &&  isTouched
  }

  formNotValid() {
    return  !this.invoiceForm.valid
  }


}
