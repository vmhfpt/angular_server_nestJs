import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name : string;
    email : string;
    phone_number : string;
    password : string;
    address : string;
    role : number;
    token : string;
    createdAt : string;
}
