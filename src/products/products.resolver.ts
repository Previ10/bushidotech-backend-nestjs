import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { CreateProductInput } from './dto/inputs/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product , {name: 'createProduct'})
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput):Promise<Product>{
    return await this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'getProducts' })
  findAll() {
    return this.productsService.findAll();
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
