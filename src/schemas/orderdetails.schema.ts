
import * as mongoose from 'mongoose';

export const OrderDetailSchema = new mongoose.Schema({
    order_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    price : Number,
    quantity : Number
});