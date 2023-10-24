import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone_number : String,
    password : String,
    address : String,
    role : Number,
    token : String,
    createdAt : String
});