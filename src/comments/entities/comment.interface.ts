import { Document } from 'mongoose';

export interface Comment extends Document {
    readonly product_id:  string;
    readonly content: string;
    readonly name : string;
    readonly email : string;
    readonly createdAt : string;
}