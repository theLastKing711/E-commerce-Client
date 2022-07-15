import { CategoryBase } from './category';
import { Base } from "./base";

export interface ProductBase extends Base {
  name: string,
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
