import { DiscountValidatorService } from './../validators/discount-validator.service';
import { DiscountService } from './../../services/discount.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  range!: FormGroup;

  constructor(private discountService: DiscountService,private DiscountValidatorService: DiscountValidatorService) { }

  ngOnInit(): void {

    this.range =  new FormGroup(
      {
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      },
      undefined,
      this.DiscountValidatorService.validateDuplicateDate(1)
    );

    this.range.valueChanges.subscribe(x =>  {
      console.log("range", this.range)
    })

  }


}
