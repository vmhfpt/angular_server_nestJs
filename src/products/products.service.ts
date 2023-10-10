import { Injectable, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.interface';
import { Category } from 'src/categories/entities/category.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<Category>
  ) {}
  async getProductSuggest(query : any){
    const data = this.productModel.find({ category_id: query.category_id});
    data.sort({_id : 1}).limit(4);
    return(data)
  }
  async findOneById(id : string){
    return this.productModel.findOne({_id : id}).populate('category_id').exec();
  }
  async findByFilter(query : any){
    const data = this.productModel.find();
    if(query._sort == 'price_sale' && query._order == 'desc'){
        data.sort([['price_sale', 'desc']]);
    }else if(query._sort == 'price_sale' && query._order == 'asc'){
        data.sort([['price_sale', 'asc']]);
    }else if(query.category_id){
        data.where({ category_id: query.category_id })
    }else if(query._sort == 'name'){
        data.sort([['name', 'asc']]);
    }
    
    return data;
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }


  async findAll(): Promise<Product[]>{
    return this.productModel.find().sort({_id : -1}).exec();
    //return this.categoryModel.find().sort({_id : -1}).exec();
  }

  async findOne(id: string):Promise<Product>{
    return this.productModel.findOne({_id : id}).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const res = await this.productModel.findOneAndUpdate({_id : id},updateProductDto).exec();
    return res;
  }

  async remove(id: string) {
    return this.productModel.deleteOne({_id : id});
  }
}
