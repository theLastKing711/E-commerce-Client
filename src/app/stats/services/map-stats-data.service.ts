import { YearlySalesDto, TopProductStatsDto, TopCategoryStatsDto } from './../../../types/stats';
import { Injectable } from '@angular/core';
import { ChartData } from 'src/types/stats';
import { MONTHS } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MapStatsDataService {

  constructor() { }


  public MapToYearlySales(yearlySalesData: YearlySalesDto[] ) : ChartData[]
  {
    return yearlySalesData.map(
      item =>
        ({name: MONTHS[item.month - 1], value: item.totalSales })
      )
  }

  public MapTopProductSalesStatsToChartData(topProductStatsDto: TopProductStatsDto[]): ChartData[] {
    return topProductStatsDto.map(
      item =>
        ({name: item.name, value: item.total })
      )
  }

  public MapTopCategorySalesStatsToChartData(topProductStatsDto: TopCategoryStatsDto[]): ChartData[] {
    return topProductStatsDto.map(
      item =>
        ({name: item.name, value: item.total })
      )
  }

}
