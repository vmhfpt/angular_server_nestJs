import { Injectable, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.interface';
import { Category } from 'src/categories/entities/category.interface';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<Category>
  ) {}
  async getProductSuggest(query : any){
    const data = this.productModel.find({ category_id: query.category_id}).populate('category_id');
    data.sort({_id : 1}).limit(4);
    return(data)
  }
  async getHome(){
    return await Promise.all([
      this.productModel.find({category_id : '659e9119e9c7e2c2d75ba8e7'}).populate('category_id').select(['-content', '-description']).skip(0).limit(3).sort({_id : -1}).exec(),
      this.productModel.find({category_id : '659e871a129790a1eb868514'}).populate('category_id').select(['-content', '-description']).skip(0).limit(3).sort({_id : -1}).exec(),
      this.productModel.find({category_id : '659e86ff129790a1eb86850f'}).populate('category_id').select(['-content', '-description']).skip(0).limit(4).sort({_id : -1}).exec()
    ])
    .then(([dataFirst, dataSecond, dataThird]) => {
       return {
        dataFirst, dataSecond, dataThird 
       }
    })
  }
  async findOneById(id : string){
    return this.productModel.findOne({_id : id}).populate('category_id').exec();
  }
  async findByFilter(query : any){
    
    //659e9119e9c7e2c2d75ba8e7
    
    var data  = this.productModel.find({}, '-content -description');

    if(query._key){
      data  = this.productModel.find({ name: { $regex: new RegExp(query._key, 'i') } }, '-content -description');
    }

    
    //const queryTotal = this.productModel.find({}, '-content -description');


    if(query.category_id){
      const [dataCategory] = await Promise.all([
        this.categoryModel.find({parent_id : query.category_id}).exec()
      ]);
      const listId = dataCategory.map((item, key) => {
        return item._id;
      })

      listId.push(new mongoose.Types.ObjectId(query.category_id));
     
      
      data.where({ category_id: { $in: listId } });
      //queryTotal.where({ category_id: { $in: listId } });
    }

    if(query._max && query._min){
      data.where('price_sale').gte(query._min)
      .where('price_sale').lte(query._max);

      //queryTotal.where('price_sale').gte(query._min)
      //.where('price_sale').lte(query._max);
    }

    

    if(query._sort == 'price_sale' && query._order == 'desc'){
        data.sort([['price_sale', 'desc']]);
    }else if(query._sort == 'price_sale' && query._order == 'asc'){
        data.sort([['price_sale', 'asc']]);
    }else if(query._sort == 'name'){
        data.sort([['name', 'asc']]);
    }
   
    const page = query._page ? Number(query._page) : 1;
    const limit_item = 5;
    const next = data.clone();
    const [dataItem, total] = await Promise.all([
      data.skip(0).limit(page *  limit_item).exec(),
      next.countDocuments().exec()
    ]);


    const  paginate = {
      total_item : Number(total),
      current_page : page,
      next_page : page < Math.ceil(Number(total) / limit_item) ? page + 1 : false,
      prev_page : page - 1 <= 0 ? false : page - 1,
      total_page : total / limit_item > 0 ?  Math.ceil(total / limit_item)  : 0 ,
      limit_item : limit_item,
      more_item : total -  dataItem.length > 0 ? total -  dataItem.length : false,
    };
    return {dataItem, paginate};
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }


  async findAll(): Promise<Product[]>{
    return this.productModel.find().populate('category_id').sort({_id : -1}).exec();
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
