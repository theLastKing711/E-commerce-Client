import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { IndexComponent } from './index/index.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesBarChartComponent } from './index/sales-bar-chart/sales-bar-chart.component';
import { TopSellingProductsChartComponent } from './top-selling-products-chart/top-selling-products-chart.component';
import { TopSellingCategoriesChartComponent } from './top-selling-categories-chart/top-selling-categories-chart.component';



@NgModule({
  declarations: [
    IndexComponent,
    SalesBarChartComponent,
    TopSellingProductsChartComponent,
    TopSellingCategoriesChartComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    NgxChartsModule,
    SharedModule
  ]
})
export class StatsModule { }
