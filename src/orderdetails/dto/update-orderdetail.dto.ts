import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderdetailDto } from './create-orderdetail.dto';

export class UpdateOrderdetailDto extends PartialType(CreateOrderdetailDto) {
    order_id:  string;
    product_id : string;
    price : Number;
    quantity : Number;
}
