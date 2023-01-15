import { ProductService } from 'src/app/services/product.service';
import { SubSink } from 'subsink';
import { Discount, EditDiscount, AddDiscount } from '../../../types/discount';
import { Product } from 'src/types/product';
import { DiscountService } from './../../services/discount.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DiscountValidatorService } from '../validators/discount-validator.service';
import { DiscountStartDateErrorMatcher } from '../validators/DiscountStartDateErrorMatcher';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {

  range!: FormGroup;

  startDateErrorMatcher: ErrorStateMatcher = new DiscountStartDateErrorMatcher();

  id!: number;

  productsList!: Product[];

  subs: SubSink = new SubSink();

  loading: boolean = false;

  discountForm!: FormGroup<{
    id: FormControl<number | null>;
    productId: FormControl<number | null>;
    value: FormControl<number | null>;
    range: FormGroup<{ startDate: FormControl<Date | null>; endDate: FormControl<Date | null> }>
   }
 >

  constructor(
    private discountService: DiscountService,
    private route: ActivatedRoute,
    private router: Router,
    private alertifyService: AlertifyService,
    private discountValidatorService: DiscountValidatorService,
    private productService: ProductService
  ) { }


  ngOnInit(): void {

    this.discountForm = new FormGroup(
      {
        id: new FormControl<number | null>(null, Validators.required),
        productId: new FormControl<number | null>(null, Validators.required),
        value: new FormControl({value: 0, disabled: true}, Validators.required,),
        range: new FormGroup(
          {
            startDate: new FormControl<Date | null>(null),
            endDate: new FormControl<Date | null>(null),
          },
        )
      },
    );


    this.route.paramMap.pipe(switchMap( (param) => {

      this.loading = true;

      const parsedId = parseInt(param.get("id")!)

      this.id = parsedId;

      return forkJoin([this.discountService.getDiscountById(parsedId), this.productService.getProductsList()])

    }))
    .subscribe(([discount, productsList]) => {

      console.log("done loading", this.loading)

      const start = new Date(discount.startDate)
      const end = new Date(discount.endDate)

      this.discountForm.setValue({
        id: discount.id,
        productId: discount.productId,
        range: {
          startDate: start,
          endDate: end
        },
        value: discount.value
      })

      this.productsList = [...productsList];

      this.loading = false;
    })

  }

   formNotValid() {
    return  !this.discountForm.valid
   }

   updatediscount() {

     this.loading = true;

     const editDiscountData: EditDiscount = this.convertFormToDto();

     this.subs.sink = this.discountService.updateDiscount(editDiscountData)
                                          .subscribe(discount=> {
                                            this.alertifyService.success("Discount updated successfully");
                                            this.loading = false;
                                            this.router.navigate(['/discounts']);
                                          })
   }


   convertFormToDto() {

    const editedUser: EditDiscount = {
      id: this.id,
      productId: this.formControls.productId.value!,
      value: this.formControls.value.value!,
      startDate: this.formControls.range.controls.startDate.value!,
      endDate: this.formControls.range.controls.endDate.value!,
    }

    return editedUser;

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

   removeDiscount(id: number) {

    console.log("idss", id)

    this.subs.sink = this.discountService.removeDiscount(id)
                                      .subscribe(() => {
                                        this.alertifyService.success("discount deleted succefully")
                                        this.router.navigate(['/discounts'])
                                      })

   }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
