import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class ProductListResponse {
  @Field(() => [Product])
  items: Product[];

  @Field(() => Int)
  itemCount: number;
}