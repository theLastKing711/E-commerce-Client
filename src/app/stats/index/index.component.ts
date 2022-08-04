import { Subscription } from 'rxjs';
import { StatsService } from './../../services/stats.service';
import { Component, OnInit } from '@angular/core';
import { ChartData } from './../../../types/stats';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  statsSubscription!: Subscription;

  loading!: boolean;

  yearlySalesList!: ChartData[];

  topSellingProductList!: ChartData[];

  topSellingCategoryList!: ChartData[];


  constructor(private statsService: StatsService) { }



  ngOnInit(): void {
    this.loading = true;
    this.statsSubscription = this.statsService.getAllStats()
                                                    .subscribe(data => {
                                                      console.log("data", data);
                                                      this.yearlySalesList = [...data.yearlySalesDto];
                                                      this.topSellingProductList = [...data.topSellerProductsDto]
                                                      this.topSellingCategoryList = [...data.topSellerCategoryDto]
                                                      this.loading = false;
                                                    })

  }

}
