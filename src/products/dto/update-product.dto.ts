import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    category_id: string;
    content: string;
    description : string;
    image : string;
    name : string;
    price : Number;
    price_sale : Number;
}
