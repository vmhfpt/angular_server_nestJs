import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './entities/order.interface';
@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
  ) {}
  async getOrderSuccess(){
    return this.orderModel.find({status : 3}).select('_id').exec();
  }
  async getStatisticOrderDay(){
    return await this.orderModel.aggregate([
      {
        $addFields: {
          convertedDate: {
            $toDate: "$createdAt"
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$convertedDate" },
            month: { $month: "$convertedDate" },
            day: { $dayOfMonth: "$convertedDate" }
          },
          
          
          count: { $sum: 1 }
        }
      }, 
      { $sort : { _id: -1 } },
      {
        $project: {
          _id: 0, 
          date: "$_id",
          count: 1 
        }
      },
      { $limit: 4 }
    ]).exec();
  }
  async getStatisticOrderStatus(){
    
    const dataStatistic =  await this.orderModel.aggregate([
      {
        $group: {
          _id: "$status", 
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0, 
          status: "$_id",
          count: 1 
        }
      }
    ]).exec();
   
    
    
    return dataStatistic
   // return this.orderModel.find().exec();
   
  }
  async updateStatusOrder(id : string, updateOrderDto: UpdateOrderDto){
    return await this.orderModel.findOneAndUpdate({_id : id},updateOrderDto).exec();
    
  }
  create(createOrderDto: CreateOrderDto) {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  findOne(id: string): Promise<Order> {
    return this.orderModel.findOne({_id : id}).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderModel.findOneAndUpdate({_id : id},updateOrderDto).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
