import { MapStatsDataService } from './../stats/services/map-stats-data.service';
import { YearlySalesDto, ChartData, StatsDto, BackEndStatsDto, TopProductStatsDto } from './../../types/stats';
import { CategoryItemDto } from './../../types/category';
import { ProductItemDto, TopSellerCategoryDto, TopSellerProductDto } from './../../types/product';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalSearchResut } from 'src/types/stats';
import { MONTHS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private statsUrl: string = `${environment.base_url}stats/`;

  constructor(private httpClient: HttpClient, private mapStatsDataService :MapStatsDataService) { }

  public searchItems(query: string)
  : Observable<GlobalSearchResut>
   {

    const searchItemsUrl = `${this.statsUrl}SearchItems`;

    const isQueryEmpty = query === "";

    const params =  new HttpParams().set('query', query)

    if(isQueryEmpty) {
      return  this.httpClient
              .get<GlobalSearchResut>(searchItemsUrl)
    }

    return this.httpClient
               .get<GlobalSearchResut>(searchItemsUrl, {params})
  }

  public getAllStats() : Observable<StatsDto>
  {

    const yearlySalesUrl = `${this.statsUrl}`;

    return this.httpClient
              .get<BackEndStatsDto>(yearlySalesUrl)
              .pipe(
                map(
                  data =>
                  {
                    return {
                      topSellerProductsDto: this.mapStatsDataService.MapTopProductSalesStatsToChartData(data.topSellerProductsDto),
                      yearlySalesDto: this.mapStatsDataService.MapToYearlySales(data.yearlySalesDto),
                      topSellerCategoryDto: this.mapStatsDataService.MapTopCategorySalesStatsToChartData(data.topSellerCategoryDto)
                    }
                  }
                )
              )

  }

  public getYearlySalesData(year: number)
    : Observable<ChartData[]>
  {
    const yearlySalesUrl = `${this.statsUrl}YearlySales`;


    return this.httpClient
               .get<YearlySalesDto[]>(yearlySalesUrl)
               .pipe(
                  map(data => this.mapStatsDataService.MapToYearlySales(data)
                    )
               )

  }

  public getTopSellerProducts() : Observable<TopSellerProductDto>
  {
    const topSellersUrl = `${this.statsUrl}TopSellingProduct`;

    return this.httpClient
                .get<TopSellerProductDto>(topSellersUrl)

  }

  public getTopSellerCategories() : Observable<TopSellerCategoryDto>
  {
    const topSellersUrl = `${this.statsUrl}TopSellingProduct`;

    return this.httpClient
                .get<TopSellerCategoryDto>(topSellersUrl)

  }

}
