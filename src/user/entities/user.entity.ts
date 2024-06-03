// user.entity.ts

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  lastname:string; ;

  @Column( {nullable:true} )
  @Field( ()=> String)
  email:string;
  
  @Column({nullable:true})
  @Field({nullable:true})
  dni:string;

  @Column( {nullable:true} )
  @Field( {nullable:true} )
  calle: string;

  @Column( {nullable:true} )
  @Field( {nullable:true} )
  numero: number;

  @Column( {nullable:true} )
  @Field( {nullable:true} ) 
  piso?: number;

  @Column( {nullable:true} )
  @Field( {nullable:true} )
  ciudad: string;

  @Column( {nullable:true} )
  @Field( {nullable:true} ) 
  departamento?: string;
}