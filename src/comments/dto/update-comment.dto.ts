import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    product_id:  string;
    content: string;
    name : string;
    email : string;
    createdAt : string;
}
