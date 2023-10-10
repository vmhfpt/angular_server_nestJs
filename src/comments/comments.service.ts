import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.interface';
import { Model } from 'mongoose';
@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }
  findByProductId(query : any){
    return this.commentModel.find({product_id : query.product_id}).populate('product_id', '-content -description').sort({_id : -1});
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
