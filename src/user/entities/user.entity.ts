// user.entity.ts

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@ObjectType()
@Entity('user') 
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field( ()=> ID )
  id:string;

  @Column()
  @Field()
  name:string; 

  @Column()
  @Field()
  lastname:string; 
  
  @Column( {nullable:true, unique:true} )
  @Field( ()=> String)
  email:string;
  
  @Column({nullable:true})
  @Field({nullable:true})
  dni:string;

  @Column( {nullable:true} )
  @Field( {nullable:true} )
  adress: string;

  @Column( {nullable:true} )
  @Field( {nullable:true} )
  numero: string;

  @Column( {nullable:true} )
  @Field( {nullable:true} ) 
  piso?: string;

  @Column( {nullable:true} )
  @Field( {nullable:true} )
  provincia: string;

  @Column( {nullable:true} )
  @Field( {nullable:true} ) 
  ciudad?: string;

  @Column()
  passWord: string

  @Column({
    type:'text',
    array:true,
    default:['user']
  })
  @Field(() => [String])
  rol: string[]

  @Column({
    type:'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive:true

  @OneToMany(() => Product, (product) =>product.user, { eager: true })
  @Field(() => [Product], { nullable: true })
  products: Product[];

}