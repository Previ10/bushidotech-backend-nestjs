import { Resolver, Query, Mutation, Args, Int, ID , ResolveField, Parent} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs , SearchArgs } from './args/';
import { ProductListResponse } from './dto/inputs/product-list-response';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product , {name: 'createProduct'})
  @UseGuards(JwtAuthGuard)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput):Promise<Product>{
    return await this.productsService.create(createProductInput);
  }

  @Query(() => ProductListResponse, { name: 'getProducts' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ProductListResponse> {
    const items = await this.productsService.findAll(paginationArgs, searchArgs);
    const itemCount = items.length; 

    return { items, itemCount };
  }


  @Query(() => Product, { name: 'getProductByid' }) 
  findOne(@Args('id', { type: () =>  ID},  ) id: string) {
    return this.productsService.findOne(id);
  }
  

  @Mutation(() => Product ,{name: 'updateProduct'})
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product ,{name: 'updateProduct'})
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }


}
