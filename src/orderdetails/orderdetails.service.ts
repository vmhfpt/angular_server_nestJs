import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';
import { OrderDetail } from './entities/orderdetail.interface';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class OrderdetailsService {
  constructor(
    @Inject('ORDER_DETAIL_MODEL')
    private orderDetailModel: Model<OrderDetail>,
  ) {}
  async getRevenue(id : string){
    
    const ObjectId = mongoose.Types.ObjectId;
    return this.orderDetailModel
    .aggregate([
      { $match: { order_id : new ObjectId(id) } },
      {
        $group: {
            _id: '$order_id', 
            totalQuantity: { $sum: { $multiply: ['$price', '$quantity']} }  
        }
    },
    {
      $project: {
        _id: 0, 
        order_id: "$_id",
        count: "$totalQuantity" 
      }
    }
    ]).exec();
  }
  async  getStatisticOrderByProduct(){
    var that = this.orderDetailModel;
  
   return await this.orderDetailModel.aggregate([
        {
            $group: {
                _id: '$product_id',  // group by product_id
                totalQuantity: { $sum: '$quantity' }  // count quantity
            }
        },
        {
          $sort: {
              totalQuantity: -1 // 1 -> asc   :::  2-> desc
          }
        },
        {
          $project: {
            _id: 0, 
            product_id: "$_id",
            count: "$totalQuantity" 
          }
        }
    ])
    .limit(5)
    .exec()
    .then(function(result) {
      return that.populate(result, {path: 'product_id', select : '-description -content -category_id -_id -price -price_sale -image'});
    })
    



  }
  create(createOrderdetailDto: CreateOrderdetailDto) {
    const createdOrderDetail = new this.orderDetailModel(createOrderdetailDto);
    return createdOrderDetail.save();
  }

  findAll() {
    return `This action returns all orderdetails`;
  }

  findOne(id: string) {
    return this.orderDetailModel.find({order_id : id}).populate('product_id', '-content -description').exec();
  }

  update(id: number, updateOrderdetailDto: UpdateOrderdetailDto) {
    return `This action updates a #${id} orderdetail`;
  }

  remove(id: string) {
    return this.orderDetailModel.deleteOne({_id : id});
  }
}
