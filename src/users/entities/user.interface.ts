import { Document } from 'mongoose';

export interface User extends Document {
    readonly name : string,
    readonly email : string,
    readonly phone_number : string,
    readonly password : string,
    readonly address : string,
    readonly role :  number,
    readonly token : string,
    readonly createdAt : string

}