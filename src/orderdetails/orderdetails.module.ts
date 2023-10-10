import { Module } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { OrderdetailsController } from './orderdetails.controller';
import { DatabaseModule } from 'src/database.module';
import { orderDetailsProviders } from './orderdetails.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [OrderdetailsController],
  providers: [OrderdetailsService, ...orderDetailsProviders],
})
export class OrderdetailsModule {}
