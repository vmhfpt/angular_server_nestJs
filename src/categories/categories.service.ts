import { Injectable, Inject } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.interface';
import { Model } from 'mongoose';
@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) : Promise<Category>{
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category>{
    return this.categoryModel.findOne({_id : id}).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.categoryModel.findOneAndUpdate({_id : id},updateCategoryDto).exec();
  }

  remove(id: string) {
    return this.categoryModel.deleteOne({_id : id});
  }
}
