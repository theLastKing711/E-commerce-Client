import { AppUser } from './appUser';
import { Product } from 'src/types/product';
import { Base } from "./base";

export interface InvoiceBase extends Base {

}

export interface Invoice extends InvoiceBase {
  createdAt: string;
  total: number;
  invoicesDetails: InvoiceDetails[]
}


export interface InvoiceDetails extends Base {
  invoiceId: number;
  product: Product;
  productId: number;
  appUser : AppUser;
  AppUserId: number;
  productQuantity: number;
}
