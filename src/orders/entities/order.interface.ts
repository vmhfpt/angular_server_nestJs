import { Document } from 'mongoose';

export interface Order extends Document {
    readonly name : string,
    readonly email : string,
    readonly phone_number : string,
    readonly note : string,
    readonly address : string,
    readonly status : Number,
    readonly createdAt : string
}