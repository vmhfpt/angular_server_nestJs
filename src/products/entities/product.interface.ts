import { Document } from 'mongoose';

export interface Product extends Document {
  readonly  category_id: any;
  readonly  content: string;
  readonly  description : string;
  readonly image : string;
  readonly name : string;
  readonly price : Number;
  readonly  price_sale : Number;
}