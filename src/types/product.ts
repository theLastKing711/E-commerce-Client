import { CategoryBase } from './category';
import { Base } from "./base";

export interface ProductBase extends Base {
  name: string,
  isPopular: boolean
}

export interface Product extends ProductBase {
   createdAt: string,
   categoryId: number,
   path: string,
   price: number,
   categoryDto: CategoryBase
}


export interface AddProduct extends ProductBase {

}

export interface ProductItemDto {
  id: number,
  name: string,
  path: string
}

export interface TopSellerProductDto {
  Id: number,
  name: string,
  total: number

}


export interface TopSellerCategoryDto {
  Id: number,
  name: string,
  total: number

}
