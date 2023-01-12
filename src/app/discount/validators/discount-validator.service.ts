import { DiscountService } from './../../services/discount.service';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountValidatorService {

  constructor(private discountService:  DiscountService) {}

  validateDuplicateDate(id: number): AsyncValidatorFn {

    return (control: AbstractControl<{start: Date | null, end: Date | null}>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
    {

      const startDate =  control.value.start?.toLocaleDateString()
      const endDate = control.value.end?.toLocaleDateString();

      console.log("control", control.value);

      if(startDate == null || endDate == null)
      {
        return of(null)
      }

      return this.discountService.checkIfDiscountDuplicated(id, startDate, endDate)
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


}
