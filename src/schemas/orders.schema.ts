
import * as mongoose from 'mongoose';
export const OrderSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone_number : String,
    note : String,
    address : String,
    status : Number,
    createdAt : String
});