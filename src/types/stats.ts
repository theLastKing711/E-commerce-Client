import { CategoryItemDto } from './category';
import { ProductItemDto } from './product';


export interface GlobalSearchResut {

  productListDto: ProductItemDto[],
  categoryListDto: CategoryItemDto[]

}

export interface BackEndStatsDto {
  yearlySalesDto: YearlySalesDto[],
  topSellerProductsDto: TopProductStatsDto[],
  topSellerCategoryDto: TopCategoryStatsDto[]
}


export interface StatsDto {
  yearlySalesDto: ChartData[],
  topSellerProductsDto: ChartData[],
  topSellerCategoryDto: ChartData[]
}

export interface YearlySalesDto {

  month: number,
  totalSales: number

}

export interface TopProductStatsDto {
  id: number,
  name: string,
  total: number
}

export interface TopCategoryStatsDto {
  id: number,
  name: string,
  total: number
}


export interface ChartData {
  name: string,
  value: number
}

