import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";


export class DiscountStartDateErrorMatcher implements ErrorStateMatcher {

  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {

    console.log("forms", form)

    if(form?.form.hasError("dateDuplicated"))
    {
      return true
    }

    return false;
  }

}
