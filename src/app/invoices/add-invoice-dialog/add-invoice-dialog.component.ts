import { Invoice } from 'src/types/invoice';
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



//  invoiceForm = new FormGroup({
//    appUserId: new FormControl(null, Validators.required),
//    invoicesDetails: new FormArray([
//        new FormGroup({
//         productId: new FormControl(null, Validators.required),
//         productQuantity: new FormControl(0, Validators.required),

//        })
//    ])
//  });


  get invoicesDetails() {
    return this.invoiceForm.controls["invoicesDetails"] as FormArray<FormGroup<{productId: FormControl<null>,productQuantity: FormControl<number | null>}>>
  }

  addInvoiceDetails() {
    var newInvoiceDetailsGroup = new FormGroup({
      productId: new FormControl(null, Validators.required),
      productQuantity: new FormControl(0, Validators.required)
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
        productId: this.fb.control(null, Validators.required),
        productQuantity: this.fb.control(0, Validators.required),
      })
    ])
      //        new FormGroup({
      //         productId: new FormControl(null, Validators.required),
      //         productQuantity: new FormControl(0, Validators.required),

      //        })
      //    ])
  })


 selectUser(e: MatSelectChange) {

 }

 selectProduct(e: MatSelectChange) {

 }

 ngOnInit(): void {
  this.userAndProductListsSubscription = this.invoiceService
                                              .getProductAndUserLists()
                                              .subscribe(reuslt => {
                                                this.productsList = [...reuslt[0].data]
                                                this.usersList = [...reuslt[1].data]
                                              })
 }


 addInvoice() {

  //  const newCategory : AddInvoice = {
  //    appUserId: 3
  //  }

  //  this.invoiceService.addInvoice(newCategory)
  //                      .subscribe(invoice => {
  //                        this.invoiceDialogService.subject.next(invoice);
  //                        this.alertifyService.success("Category added successfully")
  //                        this.dialogRef.close();
  //                      })

 }

  formArrayHasError(index: number, key: string) {

    const selectedControl = this.invoicesDetails.at(index).get(key)

    const isEmpty: boolean = selectedControl?.value == ""

    return  selectedControl?.pristine || (isEmpty)

  }

  hasError(key: string) {

    const isEmpty: boolean = this.invoiceForm.get(key)?.value == ""

    return this.invoiceForm.get(key)?.pristine || (isEmpty)
  }

  formNotValid() {
    return  !this.invoiceForm.valid
  }


}
