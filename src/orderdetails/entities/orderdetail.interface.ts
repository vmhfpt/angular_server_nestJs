import { Document } from 'mongoose';

export interface OrderDetail extends Document {
    readonly order_id:  string;
    readonly product_id : string;
    readonly price : Number;
    readonly quantity : Number;
}