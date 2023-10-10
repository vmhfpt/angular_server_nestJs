import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';
import { OrderdetailsModule } from './orderdetails/orderdetails.module';
@Module({
  //imports: [CatsModule],
  imports: [MulterModule.register({
    dest: './files',
  }), 
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files'),
    serveRoot: '/files',
  }),
  CategoriesModule,
  ProductsModule,
  CommentsModule,
  OrdersModule,
  OrderdetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
