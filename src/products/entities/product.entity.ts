import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Feature } from 'src/features/entities/feature.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column(() => Feature,)
  @Field(() => Feature, { nullable: true })
  features?: Feature;


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
  
  @ManyToOne(() => User, (user) => user.products)
  @Field( ()=> User )
  user: User[];
}