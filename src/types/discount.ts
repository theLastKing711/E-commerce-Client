import { Base } from "./base";

export interface DiscountBase {
  productId: number;
  value: number;
  startDate: Date;
  endDate: Date;
}

export interface Discount extends DiscountBase {
  id: number;
  createdAt: string
}


export interface AddDiscount extends DiscountBase {

}

export interface EditDiscount extends DiscountBase {
  id: number;
}



export interface DiscountItemDto extends DiscountBase {
}
