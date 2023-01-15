import { ProductService } from './../../services/product.service';
import { DiscountValidatorService } from './../validators/discount-validator.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DiscountService } from 'src/app/services/discount.service';
import { AddDiscount } from 'src/types/discount';
import { IndexComponent } from '../index/index.component';
import { DiscountStartDateErrorMatcher } from '../validators/DiscountStartDateErrorMatcher';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from 'src/types/product';

@Component({
  selector: 'app-add-discount-dialog',
  templateUrl: './add-discount-dialog.component.html',
  styleUrls: ['./add-discount-dialog.component.scss']
})
export class AddDiscountDialogComponent implements OnInit {

  productsList!: Product[];

  startDateErrorMatcher: ErrorStateMatcher = new DiscountStartDateErrorMatcher();

  discountForm!: FormGroup<{
     productId: FormControl<number | null>; value: FormControl<number | null>;
     range: FormGroup<{ startDate: FormControl<Date | null>; endDate: FormControl<Date | null> }>
    }
  >


  constructor(
    private discountService: DiscountService,
    public dialogRef: MatDialogRef<IndexComponent>,
    public dialogService: DialogService,
    private discountValidatorService: DiscountValidatorService,
    private alertifyService: AlertifyService,
    private productService: ProductService,
  ) {}


 ngOnInit(): void {

  // this.discountForm.controls.range.addAsyncValidators(this.discountValidatorService.validateDuplicateDate(1))

  this.discountForm = new FormGroup(
    {
     productId: new FormControl<number | null>(null, Validators.required),
     value: new FormControl(
        0,
        [Validators.required, Validators.min(0), Validators.max(100)]
     ),
     range: new FormGroup(
     {
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
     },
     ),
    },
    null,
    this.discountValidatorService.validateDuplicateDate.bind(this)
  );

  this.productService.getProductsList()
                      .subscribe(products => {
                        this.productsList = [...products]
                      })

 }

 addDiscount() {

  const addedDiscount: AddDiscount = this.convertFormToDto();

   this.discountService.addDiscount(addedDiscount)
                       .subscribe(discount => {
                         this.alertifyService.success("Discount added successfully")
                         this.dialogRef.close(true);
                       })

 }


 convertFormToDto() {

  const addedDiscount: AddDiscount = {
    productId: this.formControls.productId.value!,
    value: this.formControls.value.value!,
    startDate: this.formControls.range.controls.startDate.value!,
    endDate: this.formControls.range.controls.endDate.value!,
  }

  return addedDiscount;

 }

 get formControls() {
  return this.discountForm.controls;
 }

 hasError(key: string, errorName: string) {

  const isEmpty: boolean = this.discountForm.get(key)?.hasError(errorName)!;

  return  isEmpty
 }

 hasFormError(errorName: string) {
  return this.discountForm.hasError(errorName)
 }

}
