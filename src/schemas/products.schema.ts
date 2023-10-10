import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
export const ProductSchema = new mongoose.Schema({
    category_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    content: String,
    description : String,
    image : String,
    name : String,
    price : Number,
    price_sale : Number
});


