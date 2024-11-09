import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports:[TypeOrmModule.forFeature([Product]),],
  exports: [ProductsService],
})
export class ProductsModule {}
