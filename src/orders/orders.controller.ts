import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get('get-order-success')
  getOrderSuccess(){
    return this.ordersService.getOrderSuccess();
  }
  @Get('get-satistic-by-day')
  getStatisticByDay(){
    return this.ordersService.getStatisticOrderDay();
  }
  @Get('get-statistic')
  getStatistic(){
    return this.ordersService.getStatisticOrderStatus();
  }
  @Put('update-state/:id')
  updateState(@Param('id') id : string, @Body() updateOrderDto : UpdateOrderDto){
    return this.ordersService.updateStatusOrder(id, updateOrderDto);
  }
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }


  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
