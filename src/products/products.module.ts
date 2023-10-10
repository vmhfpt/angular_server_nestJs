import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database.module';
import { productsProviders } from './products.providers';
import { categoriesProviders } from 'src/categories/categories.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders, ...categoriesProviders],
})
export class ProductsModule {}
