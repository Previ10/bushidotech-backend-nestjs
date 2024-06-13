import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column('text', { array: true })
  @Field(() => [String])
  features: string[];

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string; //pasar imagen en base 64

  @Column({ nullable: true })
  @Field({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column('float', { nullable: true })
  @Field(() => Float, { nullable: true })
  precio: number;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  stock: number;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  garantia: string[];
}