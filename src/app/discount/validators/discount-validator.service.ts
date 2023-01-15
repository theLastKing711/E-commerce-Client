import { DiscountService } from './../../services/discount.service';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountValidatorService {

  constructor(private discountService:  DiscountService) {}

  validateDuplicateDate<T extends { productId: number, range: { startDate: Date, endDate: Date } }>(
    control: AbstractControl<T>
  ):
    Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

      console.log("controls", control)

      const productId = control?.value?.productId;
      const startDate =  control?.value?.range?.startDate?.toLocaleDateString();
      const endDate = control?.value?.range?.endDate?.toLocaleDateString();

      if(startDate == null || endDate == null || productId == null)
      {
        return of(null)
      }


      return this.discountService.checkIfDiscountDuplicated(productId, startDate, endDate)
                                  .pipe(
                                    map(message => {
                                      if(message)
                                      {
                                        return {dateDuplicated: message}
                                      }
                                      else
                                      {
                                        return  null;
                                      }
                                    })
                                  )

  }

  validateDuplicateDateOnUpdate<T extends { productId: number, range: { startDate: Date, endDate: Date } }>(
    control: AbstractControl<T>
  ):
    Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

      console.log("controls", control)

      const productId = control?.value?.productId;
      const startDate =  control?.value?.range?.startDate?.toLocaleDateString();
      const endDate = control?.value?.range?.endDate?.toLocaleDateString();

      if(startDate == null || endDate == null || productId == null)
      {
        return of(null)
      }


      return this.discountService.checkIfDiscountDuplicatedOnUpdate(productId, startDate, endDate)
                                  .pipe(
                                    map(message => {
                                      if(message)
                                      {
                                        return {dateDuplicated: message}
                                      }
                                      else
                                      {
                                        return  null;
                                      }
                                    })
                                  )

  }

}
