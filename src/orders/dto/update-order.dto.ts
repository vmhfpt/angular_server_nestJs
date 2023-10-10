import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    name : string;
    email : string;
    phone_number : string;
    note : string;
    address : string;
    status : Number;
    createdAt : string;
}
