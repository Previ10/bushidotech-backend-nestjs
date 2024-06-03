import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  lastname: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  dni?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  calle?: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  numero?: number;
  
  @IsNumber()
  @Field(() => Int, { nullable: true })
  piso?: number;
  
  @IsString()
  @Field(() => String, { nullable: true })
  ciudad?: string;
  
  @IsString()
  @Field(() => String, { nullable: true })
  departamento?: string;
}