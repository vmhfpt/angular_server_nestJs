import { Module, NestModule, MiddlewareConsumer , RequestMethod} from '@nestjs/common';
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
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
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
  OrderdetailsModule,
  UsersModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'categories', method: RequestMethod.GET },
        { path: 'products', method: RequestMethod.GET },
        { path: 'orders', method: RequestMethod.POST },
        { path: 'orderdetails', method: RequestMethod.POST },
      )
      .forRoutes( 
        { path: 'categories', method: RequestMethod.ALL },
        { path: 'products', method: RequestMethod.ALL },
        { path: 'orders', method: RequestMethod.ALL },
        { path: 'orderdetails', method: RequestMethod.ALL },
      );
  }
}
