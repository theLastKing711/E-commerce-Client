import { AppUser } from './appUser';
import { Product } from 'src/types/product';
import { Base } from "./base";

export interface InvoiceBase {
  appUserId: number;
}

export interface InvoiceDetailsBase {
  productId: number;
  productQuantity: number
}

export interface Invoice extends Base, InvoiceBase {
  appUser: AppUser;
  createdAt: string;
  total: number;
  invoicesDetails: InvoiceDetails[]
}

export interface AddInvoice extends InvoiceBase {
  InvoicesDetails: AddInvoiceDetails[];
}

export interface InvoiceDetails extends Base, InvoiceDetailsBase {
  invoiceId: number;
  product: Product;
}

export interface AddInvoiceDetails extends InvoiceDetailsBase {

}
