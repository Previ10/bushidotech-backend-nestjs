import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from './args';


@Injectable()
export class ProductsService {
  private product: Product[] = []

  constructor(@InjectRepository(Product)
  private readonly productRepository: Repository<Product>) {


  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(createProductInput);
    return await this.productRepository.save(newProduct);
  }
  async findAll(
    paginationArgs: PaginationArgs = { limit: 100, offset: 0 },
    searchArgs: SearchArgs,
  ): Promise<Product[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(product.type) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async countAll(): Promise<number> {
    return await this.productRepository.count();
  }


  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) throw new NotFoundException(`No se encontro el producto con el #${id}`)
    return await product;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const product = await this.findOne(id);
  
      if (!product) {
        throw new NotFoundException(`No se encontró el producto con el ID ${id}`);
      }
  
      await this.productRepository.remove(product);
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar el producto con ID ${id}: ${error.message}`);
    }
  }
}
