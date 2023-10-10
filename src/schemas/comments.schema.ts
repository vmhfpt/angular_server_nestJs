import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
export const CommentSchema = new mongoose.Schema({
    product_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    content: String,
    name : String,
    email : String,
    createdAt : String
});