import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs , SearchArgs } from './args/';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product , {name: 'createProduct'})
  @UseGuards(JwtAuthGuard)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput):Promise<Product>{
    return await this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'getProducts' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() SearchArgs: SearchArgs,
  ): Promise<Product[]> {
    console.log(paginationArgs, SearchArgs)

    return this.productsService.findAll(paginationArgs, SearchArgs);

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
