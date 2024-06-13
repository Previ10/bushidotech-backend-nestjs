import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private product: Product[] = []

  constructor( @InjectRepository(Product)
  private readonly productRepository: Repository<Product>){
   
    
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(createProductInput)
    return await this.productRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find()
    
  }

  async findOne(id: string ): Promise<Product> {
    const product = await this.productRepository.findOneBy({id})
    if(!product) throw new NotFoundException(`No se encontro el producto con el #${id}`)
    return await product;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
